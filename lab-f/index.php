<?php
require __DIR__ . '/autoload.php';

use App\Serializer;

$serializer = new Serializer();

$input    = '';
$output   = '';
$inFmt    = 'CSV';
$outFmt   = 'JSON';
$error    = null;

if (isset($_COOKIE['input']))  $input  = $_COOKIE['input'];
if (isset($_COOKIE['inFmt']))  $inFmt  = $_COOKIE['inFmt'];
if (isset($_COOKIE['outFmt'])) $outFmt = $_COOKIE['outFmt'];

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $input  = $_POST['input']  ?? '';
    $inFmt  = $_POST['inFmt']  ?? 'CSV';
    $outFmt = $_POST['outFmt'] ?? 'JSON';

    setcookie('input',  $input,  time() + 86400 * 30, '/');
    setcookie('inFmt',  $inFmt,  time() + 86400 * 30, '/');
    setcookie('outFmt', $outFmt, time() + 86400 * 30, '/');

    try {
        $output = $serializer->convert($input, $inFmt, $outFmt);
    } catch (\Exception $e) {
        $error = $e->getMessage();
    }
}

require __DIR__ . '/templates/layout.php';