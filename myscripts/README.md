# MyScripts - AI-Powered Video Scripts for Amazon Influencers

MyScripts is a SaaS application that helps Amazon influencers generate AI-optimized video scripts for their affiliate product videos. This application includes a pricing plan with Stripe integration, affiliate referral tracking with Lemon Squeezy, a dashboard to manage scripts, and a viral refer-a-friend page.

## Features

- AI-powered script generation for Amazon product videos (30-60 seconds)
- Trending keywords and product benefits integration
- Adjustable tone (casual, professional, funny)
- Tiered pricing plans with Stripe integration
- Affiliate program with Lemon Squeezy
- Script management dashboard
- User authentication and account management
- Refer-a-friend viral marketing system
- Responsive design for all devices

## Tech Stack

- Node.js
- Express.js
- MongoDB
- EJS templating
- Bootstrap 5
- OpenAI API
- Stripe API
- Lemon Squeezy API

## Installation

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Create a `.env` file based on `.env.example`
4. Start the application:
   ```
   npm start
   ```

## Environment Variables

Copy the `.env.example` file to `.env` and fill in your values:

- `NODE_ENV`: Set to 'development' or 'production'
- `PORT`: The port the server will run on
- `MONGODB_URI`: Your MongoDB connection string
- `SESSION_SECRET`: Secret for Express session
- `OPENAI_API_KEY`: Your OpenAI API key
- `STRIPE_SECRET_KEY`: Your Stripe secret key
- `STRIPE_PUBLISHABLE_KEY`: Your Stripe publishable key
- `STRIPE_WEBHOOK_SECRET`: Your Stripe webhook secret
- `LEMONSQUEEZY_API_KEY`: Your Lemon Squeezy API key
- `LEMONSQUEEZY_STORE_ID`: Your Lemon Squeezy store ID

## Deployment to Render.com

This application is configured for easy deployment to Render.com:

1. Create a new Web Service on Render
2. Connect your GitHub repository
3. Use the following settings:
   - Build Command: `npm install`
   - Start Command: `node app.js`
4. Add the environment variables from your `.env` file
5. Deploy the application

Alternatively, you can use the `render.yaml` file for Blueprint deployment:

```
render blueprint launch
```

## Directory Structure

- `/config`: Configuration files
- `/controllers`: Controller logic
- `/middleware`: Custom middleware
- `/models`: MongoDB models
- `/public`: Static assets (CSS, JS, images)
- `/routes`: Express routes
- `/views`: EJS templates

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, email support@trymyscripts.com or visit our website at https://trymyscripts.com
