defmodule GuardianAuthApi.Repo.Migrations.AddOauthToUsers do
  use Ecto.Migration

  def change do
    alter table(:users) do
      add :provider, :string
      add :provider_id, :string
      add :provider_token, :string
      add :provider_email, :string
    end

    # Make password_hash nullable for OAuth users
    alter table(:users) do
      modify :password_hash, :string, null: true
    end

    create unique_index(:users, [:provider, :provider_id])
  end
end
