function ThankYouPage() {
    return (
        <div>
            <h1>Thank You!</h1>
            <p>Your submission has been saved.</p>
            <button onClick={() => window.location.href = '/'}>Return to Dashboard</button>
        </div>
    );
}

export default ThankYouPage;
