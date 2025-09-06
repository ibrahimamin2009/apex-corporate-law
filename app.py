from flask import Flask, render_template, request, jsonify, flash, redirect, url_for
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import os
from config import Config

app = Flask(__name__)
app.config.from_object(Config)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/about')
def about():
    return render_template('about.html')

@app.route('/services')
def services():
    return render_template('services.html')

@app.route('/track-record')
def track_record():
    return render_template('track_record.html')

@app.route('/media')
def media():
    return render_template('media.html')

@app.route('/contact')
def contact():
    return render_template('contact.html')

@app.route('/send_email', methods=['POST'])
def send_email():
    try:
        # Get form data
        name = request.form.get('name')
        company = request.form.get('company', 'Not provided')
        email = request.form.get('email')
        phone = request.form.get('phone', 'Not provided')
        subject = request.form.get('subject', request.form.get('reason', 'Not specified'))
        message = request.form.get('message', f"Reason for contact: {request.form.get('reason', 'Not specified')}")
        
        # Email configuration
        smtp_server = app.config['MAIL_SERVER']
        smtp_port = app.config['MAIL_PORT']
        sender_email = app.config['MAIL_USERNAME']
        sender_password = app.config['MAIL_PASSWORD']
        
        # Create message
        msg = MIMEMultipart()
        msg['From'] = sender_email
        msg['To'] = sender_email
        msg['Subject'] = f"New Contact Form Submission - {subject}"
        
        # Email body
        body = f"""
        New contact form submission from Apex Corporate Law website:
        
        Name: {name}
        Company: {company}
        Email: {email}
        Phone: {phone}
        Subject: {subject}
        
        Message:
        {message}
        
        ---
        This message was sent from the Apex Corporate Law contact form.
        """
        
        msg.attach(MIMEText(body, 'plain'))
        
        # Send email
        server = smtplib.SMTP(smtp_server, smtp_port)
        server.starttls()
        server.login(sender_email, sender_password)
        text = msg.as_string()
        server.sendmail(sender_email, sender_email, text)
        server.quit()
        
        return jsonify({'success': True, 'message': 'Thank you for your message. We will contact you soon.'})
        
    except Exception as e:
        return jsonify({'success': False, 'message': 'Sorry, there was an error sending your message. Please try again.'})

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=8000)

# For Vercel deployment
app = app
