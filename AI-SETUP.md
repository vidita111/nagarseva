# AI Categorization Setup Guide

## 🤖 How AI Categorization Works

When a citizen submits a complaint, the system:
1. Sends the complaint details to Claude AI (via Anthropic API)
2. AI analyzes the complaint and returns:
   - **Category** (Roads/Water/Electricity/etc.)
   - **Department** (specific government department)
   - **Priority** (High/Medium/Low)
   - **Summary** (professional summary)
3. These AI-generated fields are stored in Firebase with the complaint

## 🔧 Setup Instructions

### For Local Development (Testing without AI):
The app will work without AI - it uses fallback values:
- Category: User's selected category
- Department: "General Administration"
- Priority: "Medium"
- Summary: Default message

### For Production (Enable AI Categorization):

#### Step 1: Get Anthropic API Key
1. Go to [Anthropic Console](https://console.anthropic.com/)
2. Sign up or log in
3. Navigate to API Keys section
4. Create a new API key
5. Copy the key (Google AI Studio API key)

#### Step 2: Set Up Netlify Environment Variables
1. Go to your Netlify dashboard
2. Select your site
3. Navigate to: **Site Settings** → **Environment Variables**
4. Add a new variable:
   - **Key**: `ANTHROPIC_KEY`
   - **Value**: Your Anthropic API key (paste the full key)
5. Click **Save**

#### Step 3: Deploy to Netlify
The app is configured to work with Netlify:
- Functions are in `netlify/functions/` directory
- Configuration is in `netlify.toml`

Deploy methods:
- **Connect to Git**: Push to GitHub and connect Netlify to your repo
- **Netlify CLI**: Run `netlify deploy --prod`
- **Drag & Drop**: Upload the entire folder to Netlify

#### Step 4: Test AI Categorization
1. Visit your deployed site
2. Submit a test complaint
3. Check if the AI results appear in the success message
4. Verify the complaint in Firebase has AI fields populated

## 📁 File Structure

```
nagarseva/
├── netlify/
│   └── functions/
│       └── ai-proxy.js          # Secure serverless function
├── netlify.toml                  # Netlify configuration
├── submit.html                   # Calls AI via /.netlify/functions/ai-proxy
└── .env.example                  # Environment variable template
```

## 🔒 Security Notes

- **NEVER** put your Anthropic API key in client-side code (HTML/JS files)
- **ALWAYS** use Netlify environment variables for API keys
- The `ai-proxy.js` function acts as a secure proxy - your API key stays on the server
- Client code calls `/.netlify/functions/ai-proxy`, not Anthropic directly

## 🐛 Troubleshooting

### AI categorization not working:
1. **Check Netlify logs**:
   - Go to Netlify dashboard → Functions → ai-proxy → View logs
   - Look for errors or "invalid API key" messages

2. **Verify environment variable**:
   - Check Netlify dashboard → Environment Variables
   - Make sure `ANTHROPIC_KEY` is set correctly
   - Re-deploy after adding/changing variables

3. **Check browser console**:
   - Open DevTools → Console
   - Submit a complaint
   - Look for errors or "AI call failed" warnings
   - The app will still work with fallback values

4. **Test the function directly**:
   ```bash
   curl -X POST https://your-site.netlify.app/.netlify/functions/ai-proxy \
     -H "Content-Type: application/json" \
     -d '{"model":"claude-sonnet-4-20250514","max_tokens":300,"messages":[{"role":"user","content":"Test"}]}'
   ```

### Common issues:
- **405 Method Not Allowed**: The function only accepts POST requests
- **Invalid API key**: Check your ANTHROPIC_KEY in Netlify
- **Quota exceeded**: Check your Anthropic usage limits
- **CORS errors**: Make sure netlify.toml has correct headers

## 💰 API Costs

Anthropic pricing (as of 2026):
- Claude Sonnet 4: ~$3 per million input tokens
- Each complaint analysis uses ~300 tokens
- Estimate: ~$0.001 per complaint analysis

For a municipal system with 1000 complaints/month:
- Cost: ~$1-2/month for AI categorization

## 🎯 Next Steps

After setup:
1. Test with various complaint types
2. Monitor AI accuracy in categorization
3. Adjust the AI prompt in submit.html if needed
4. Consider fine-tuning based on your municipality's departments
