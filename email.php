<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
use PHPMailer\PHPMailer\SMTP;

require 'vendor/autoload.php';

/**
 * @param string $title Judul pesan (e.g., "Pesan Terkirim!")
 * @param string $message Detail pesan yang akan ditampilkan.
 * @param bool $isSuccess Menentukan apakah ini pesan sukses (true) atau gagal (false).
 */
function displayStatusPage($title, $message, $isSuccess) {
    $titleColor = $isSuccess ? '#EEEEEE' : '#FD7014';

    echo <<<HTML
<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Status Pengiriman Pesan</title>
    <link rel="icon" href="/assets//images/favicon.ico" type="image/x-icon">
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&family=Montserrat:wght@300;400;500;700&display=swap" rel="stylesheet">
    <style>
        :root {
            --primary: #222831;
            --secondary: #393E46;
            --accent: #FD7014;
            --light: #EEEEEE;
        }

        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Poppins', sans-serif;
            background-color: var(--primary);
            color: var(--light);
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            text-align: center;
            padding: 20px;
        }

        .status-container {
            max-width: 600px;
        }

        .status-title {
            font-family: 'Montserrat', sans-serif;
            font-size: 3rem;
            font-weight: 700;
            color: {$titleColor};
            margin-bottom: 1rem;
        }

        .status-message {
            font-size: 1.1rem;
            margin-bottom: 2.5rem;
            line-height: 1.6;
        }

        .btn {
            display: inline-block;
            padding: 12px 30px;
            background-color: var(--accent);
            color: var(--light);
            text-decoration: none;
            border-radius: 30px;
            font-weight: 600;
            transition: all 0.3s ease;
            border: none;
            cursor: pointer;
        }

        .btn:hover {
            background-color: #e05d0a;
            transform: translateY(-3px);
            box-shadow: 0 5px 15px rgba(253, 112, 20, 0.3);
        }

        /* Responsif untuk layar kecil */
        @media (max-width: 768px) {
            .status-title {
                font-size: 2.5rem;
            }
            .status-message {
                font-size: 1rem;
            }
        }
    </style>
</head>
<body>
    <div class="status-container">
        <h1 class="status-title">{$title}</h1>
        <p class="status-message">{$message}</p>
        <a href="/" class="btn">Back to Homepage</a>
    </div>
</body>
</html>
HTML;
    exit();
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    
    $mail = new PHPMailer(true);

    try {
        // $mail->SMTPDebug = SMTP::DEBUG_SERVER; 
        $mail->isSMTP();
        $mail->Host       = 'smtp.zoho.com';
        $mail->SMTPAuth   = true;
        $mail->Username   = 'noreply@fahrizalportofolio.my.id';
        $mail->Password   = ''; // Ganti dengan password email Anda
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
        $mail->Port       = 465;

        // Penerima Pesan
        $name    = htmlspecialchars($_POST['name']);
        $email   = htmlspecialchars($_POST['email']);
        $subject = htmlspecialchars($_POST['subject']);
        $message = htmlspecialchars($_POST['message']);

        $mail->setFrom('noreply@fahrizalportofolio.my.id', 'Form Kontak Website');
        $mail->addAddress('fahrisyad@gmail.com', 'Admin Portofolio');
        $mail->addReplyTo($email, $name);

        // Isi Pesan
        $mail->isHTML(true);
        $mail->Subject = 'Pesan Baru dari Portofolio: ' . $subject;
        $mail->Body    = "Pesan dari: <b>{$name}</b> ({$email})<br><br><b>Subjek:</b> {$subject}<br><br><b>Pesan:</b><br>{$message}";
        $mail->AltBody = "Pesan dari: {$name} ({$email})\n\nSubjek: {$subject}\n\nPesan:\n{$message}";

        $mail->send();
        
        displayStatusPage('Message Sent!', 'Thank you for contacting me. I will respond to your message as soon as possible.', true);

    } catch (Exception $e) {
        
        displayStatusPage('Sending Failed', "Sorry, your message could not be sent. Please try again later or contact me through another method. Error Details: {$mail->ErrorInfo}", false);
    }

} else {
    displayStatusPage('Access Denied', 'This page cannot be accessed directly.', false);
}
?>
