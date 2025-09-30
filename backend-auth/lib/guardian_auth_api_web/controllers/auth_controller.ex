defmodule GuardianAuthApiWeb.AuthController do
  use GuardianAuthApiWeb, :controller

  alias GuardianAuthApi.{Accounts, Guardian}

  action_fallback GuardianAuthApiWeb.FallbackController

  def register(conn, %{"email" => email, "password" => password}) do
    user_params = %{"email" => email, "password" => password}
    case Accounts.register_user(user_params) do
      {:ok, user} ->
        conn
        |> Guardian.Plug.sign_in(user)
        |> put_status(:created)
        |> json(%{
          message: "User created successfully",
          user: %{
            id: user.id,
            email: user.email
          }
        })

      {:error, changeset} ->
        conn
        |> put_status(:unprocessable_entity)
        |> json(%{
          message: "Registration failed",
          errors: format_changeset_errors(changeset)
        })
    end
  end

  def login(conn, %{"email" => email, "password" => password}) do
    case Accounts.authenticate_user(email, password) do
      {:ok, user} ->
        conn
        |> Guardian.Plug.sign_in(user)
        |> json(%{
          message: "Login successful",
          user: %{
            id: user.id,
            email: user.email
          }
        })

      {:error, :invalid_credentials} ->
        conn
        |> put_status(:unauthorized)
        |> json(%{message: "Invalid email or password"})
    end
  end

  def logout(conn, _params) do
    conn
    |> Guardian.Plug.sign_out()
    |> json(%{message: "Logout successful"})
  end

  def me(conn, _params) do
    user = Guardian.Plug.current_resource(conn)

    conn
    |> json(%{
      user: %{
        id: user.id,
        email: user.email
      }
    })
  end

  defp format_changeset_errors(changeset) do
    Ecto.Changeset.traverse_errors(changeset, fn {msg, opts} ->
      Regex.replace(~r"%{(\w+)}", msg, fn _, key ->
        opts |> Keyword.get(String.to_existing_atom(key), key) |> to_string()
      end)
    end)
  end
end
