# Email Setup Guide for Apex Corporate Law Website

## Setting Up Email Functionality

To enable the contact form to send emails to `ibrahimamin9621@gmail.com`, you need to set up Gmail App Password authentication.

### Step 1: Enable 2-Factor Authentication
1. Go to your Google Account settings
2. Navigate to Security
3. Enable 2-Step Verification if not already enabled

### Step 2: Generate App Password
1. In your Google Account settings, go to Security
2. Under "2-Step Verification", click on "App passwords"
3. Select "Mail" as the app
4. Select "Other" as the device and name it "Apex Corporate Law Website"
5. Copy the generated 16-character password

### Step 3: Update Configuration
1. Open `config.py`
2. Replace `'your_app_password_here'` with your generated app password
3. Or set it as an environment variable:
   ```bash
   export MAIL_PASSWORD="your_16_character_app_password"
   ```

### Step 4: Test the Email Functionality
1. Run the Flask application: `python app.py`
2. Go to the contact page
3. Fill out and submit the form
4. Check your email for the message

## Alternative: Using Environment Variables (Recommended)

For security, you can set the email password as an environment variable:

```bash
# On macOS/Linux
export MAIL_PASSWORD="your_16_character_app_password"

# On Windows
set MAIL_PASSWORD=your_16_character_app_password
```

Then update `config.py`:
```python
MAIL_PASSWORD = os.environ.get('MAIL_PASSWORD') or 'your_app_password_here'
```

## Troubleshooting

### Common Issues:
1. **"Authentication failed"**: Make sure you're using the App Password, not your regular Gmail password
2. **"Connection refused"**: Check your internet connection and firewall settings
3. **"SMTP server not found"**: Verify the SMTP settings in `config.py`

### Testing Email Without Gmail:
If you want to test without setting up Gmail, you can use a service like Mailtrap or simply comment out the email sending code and just show a success message.

## Security Notes:
- Never commit your actual email password to version control
- Use environment variables for sensitive information
- Consider using a dedicated email service for production use
