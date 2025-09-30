defmodule GuardianAuthApiWeb.AuthController do
  use GuardianAuthApiWeb, :controller

  alias GuardianAuthApi.{Accounts, Guardian}
  plug Ueberauth

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

  def request(conn, _params) do
    # Ueberauth handles the redirect to the OAuth provider
    conn
  end

  def callback(%{assigns: %{ueberauth_failure: _fails}} = conn, _params) do
    conn
    |> put_status(:unauthorized)
    |> json(%{error: "Failed to authenticate"})
  end

  def callback(%{assigns: %{ueberauth_auth: auth}} = conn, _params) do
    user_params = %{
      email: auth.info.email,
      provider: to_string(auth.provider),
      provider_id: auth.uid,
      provider_token: auth.credentials.token,
      provider_email: auth.info.email
    }

    case Accounts.upsert_oauth_user(user_params) do
      {:ok, user} ->
        # Sign in the user using Guardian session
        frontend_url = System.get_env("FRONTEND_URL") || "http://localhost:3000"

        conn
        |> Guardian.Plug.sign_in(user)
        # Here is the redirect link after successful login
        |> redirect(external: "#{frontend_url}")

      {:error, changeset} ->
        frontend_url = System.get_env("FRONTEND_URL") || "http://localhost:3000"

        conn
        |> redirect(external: "#{frontend_url}/?error=auth_failed")
    end
  end

  defp format_changeset_errors(changeset) do
    Ecto.Changeset.traverse_errors(changeset, fn {msg, opts} ->
      Regex.replace(~r"%{(\w+)}", msg, fn _, key ->
        opts |> Keyword.get(String.to_existing_atom(key), key) |> to_string()
      end)
    end)
  end
end
