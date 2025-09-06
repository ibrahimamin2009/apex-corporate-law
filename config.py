import os

class Config:
    # Email configuration
    MAIL_SERVER = 'smtp.gmail.com'
    MAIL_PORT = 587
    MAIL_USE_TLS = True
    MAIL_USERNAME = 'ibrahimamin9621@gmail.com'
    MAIL_PASSWORD = os.environ.get('MAIL_PASSWORD') or 'your_app_password_here'
    
    # Security
    SECRET_KEY = 'apex_corporate_law_secret_key_2024'
    
    # Email settings
    MAIL_DEFAULT_SENDER = 'ibrahimamin9621@gmail.com'
    MAIL_RECIPIENT = 'ibrahimamin9621@gmail.com'
