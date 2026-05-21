<?php
namespace App\Encoder;

class JsonEncoder implements EncoderInterface{
    public function decode(string $data): array {
        return json_decode($data, true) ?? [];
    }
    public function encode(array $data): string {
        return json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
    }
}