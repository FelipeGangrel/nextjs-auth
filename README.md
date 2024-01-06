# Next-Auth

## Resources

### Postgres hosting

- Neon.tech: https://neon.tech/ (disconnects all the time)
- ElephantSQL: https://www.elephantsql.com/

### Next-Auth

- Next-Auth: https://authjs.dev/ (authentication)
  - Prisma adapter: https://authjs.dev/reference/adapter/prisma

### Email sending

- Resend: https://resend.com (You will only get to send emails to your own email address until you verify your domain)

## How to create a Github OAuth app

- Go to [Github.com](https://github.com)
- Access the profile menu and click on "Settings"
- Click on "Developer Settings"
- Click on "OAuth Apps"
- Create a new OAuth App
- Fill in the form
  - Application name: Next-Auth or whatever you want
  - Homepage URL: http://localhost:3000
  - Authorization callback URL: http://localhost:3000/api/auth/callback/github (you can get the URL by running the project and going to http://localhost:3000/api/auth/providers)
- Click on "Register application"
- Copy the Client ID and Client Secret and paste them in the `.env` file

## How to create a Google OAuth app

- Go to [console.developers.google.com](https://console.developers.google.com/)
- Create a new project
- Click on "Oauth consent screen" and select the "External" user type and click on "Create"
- Fill in the form
  - App name: Next-Auth or whatever you want
  - User support email: your email
  - You can add an authorized domain after you deploy your app
  - Developer contact information: your email
- Click on "Save and continue"
- On the "Scopes" step, you don't need to add anything, just click on "Save and continue"
- On the "Test users" step, you don't need to add anything, just click on "Save and continue"
- Click on "Credentials" on the left menu
- Click on "Create credentials" and select "OAuth client ID"
- Select "Web application"
- You can leave the name as it is
- On the "Authorized JavaScript origins" field, add http://localhost:3000
- On the "Authorized redirect URIs" field, add http://localhost:3000/api/auth/callback/google (you can get the URL by running the project and going to http://localhost:3000/api/auth/providers)
- Click on "Create"
- Copy the Client ID and Client Secret and paste them in the `.env` file
