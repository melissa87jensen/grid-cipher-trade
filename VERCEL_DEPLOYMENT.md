# Vercel Deployment Guide for Grid Cipher Trade

This guide provides step-by-step instructions for deploying the Grid Cipher Trade application to Vercel.

## Prerequisites

- Vercel account (free tier available)
- GitHub account with access to the repository
- Environment variables ready

## Step-by-Step Deployment Process

### Step 1: Access Vercel Dashboard

1. Go to [vercel.com](https://vercel.com)
2. Sign in with your GitHub account
3. Click on "New Project" or "Add New..." → "Project"

### Step 2: Import GitHub Repository

1. In the "Import Git Repository" section, search for `melissa87jensen/grid-cipher-trade`
2. Click on the repository when it appears
3. Click "Import" to proceed

### Step 3: Configure Project Settings

1. **Project Name**: `grid-cipher-trade` (or your preferred name)
2. **Framework Preset**: Select "Vite"
3. **Root Directory**: Leave as default (`.`)
4. **Build Command**: `npm run build`
5. **Output Directory**: `dist`
6. **Install Command**: `npm install`

### Step 4: Configure Environment Variables

Click on "Environment Variables" and add the following variables:

```
VITE_CHAIN_ID=11155111
VITE_RPC_URL=your_rpc_endpoint_here
VITE_WALLET_CONNECT_PROJECT_ID=your_wallet_connect_project_id
VITE_INFURA_API_KEY=your_infura_api_key
```

**Important**: Make sure to add these variables for all environments (Production, Preview, Development).

### Step 5: Advanced Configuration (Optional)

If you need to customize the build process, you can add a `vercel.json` file to the root directory:

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite",
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

### Step 6: Deploy

1. Click "Deploy" button
2. Wait for the build process to complete (usually 2-5 minutes)
3. Once deployed, you'll receive a URL like `https://grid-cipher-trade-xxx.vercel.app`

### Step 7: Custom Domain (Optional)

1. Go to your project dashboard in Vercel
2. Click on "Settings" tab
3. Navigate to "Domains" section
4. Add your custom domain
5. Follow the DNS configuration instructions

## Post-Deployment Configuration

### Step 8: Verify Deployment

1. Visit your deployed URL
2. Test wallet connection functionality
3. Verify all features are working correctly
4. Check that environment variables are properly loaded

### Step 9: Set Up Automatic Deployments

- Vercel automatically deploys from the `main` branch
- Every push to `main` will trigger a new deployment
- Pull requests will create preview deployments

## Environment Variables Reference

| Variable | Value | Description |
|----------|-------|-------------|
| `VITE_CHAIN_ID` | `11155111` | Ethereum Sepolia testnet chain ID |
| `VITE_RPC_URL` | `your_rpc_endpoint_here` | RPC endpoint for blockchain connection |
| `VITE_WALLET_CONNECT_PROJECT_ID` | `your_wallet_connect_project_id` | WalletConnect project ID |
| `VITE_INFURA_API_KEY` | `your_infura_api_key` | Infura API key for RPC access |

## Troubleshooting

### Common Issues

1. **Build Fails**: Check that all dependencies are in `package.json`
2. **Environment Variables Not Loading**: Ensure variables are prefixed with `VITE_`
3. **Wallet Connection Issues**: Verify WalletConnect project ID is correct
4. **RPC Connection Problems**: Check that RPC URL and API key are valid

### Build Logs

- Access build logs in Vercel dashboard under "Functions" tab
- Check for any TypeScript or build errors
- Verify all imports are correct

### Performance Optimization

1. Enable Vercel's Edge Functions if needed
2. Configure caching headers for static assets
3. Use Vercel's Analytics for performance monitoring

## Security Considerations

1. **Environment Variables**: Never commit sensitive keys to the repository
2. **API Keys**: Rotate keys regularly
3. **CORS**: Configure CORS settings if needed for API calls
4. **HTTPS**: Vercel provides HTTPS by default

## Monitoring and Analytics

1. **Vercel Analytics**: Enable in project settings
2. **Error Tracking**: Consider integrating Sentry or similar
3. **Performance Monitoring**: Use Vercel's built-in performance insights

## Support

- Vercel Documentation: [vercel.com/docs](https://vercel.com/docs)
- Vercel Community: [github.com/vercel/vercel/discussions](https://github.com/vercel/vercel/discussions)
- Project Issues: Create issues in the GitHub repository

## Deployment Checklist

- [ ] Repository imported to Vercel
- [ ] Framework preset set to Vite
- [ ] Environment variables configured
- [ ] Build command verified
- [ ] Output directory set to `dist`
- [ ] Initial deployment successful
- [ ] Wallet connection tested
- [ ] All features verified
- [ ] Custom domain configured (if applicable)
- [ ] Analytics enabled (optional)

## Next Steps After Deployment

1. **Test All Features**: Ensure trading functionality works
2. **Monitor Performance**: Check Vercel analytics
3. **Set Up Monitoring**: Configure error tracking
4. **Update Documentation**: Keep deployment docs current
5. **Backup Configuration**: Save environment variable values securely

---

**Note**: This deployment guide assumes you're using the free Vercel tier. For production applications, consider upgrading to a paid plan for better performance and features.
