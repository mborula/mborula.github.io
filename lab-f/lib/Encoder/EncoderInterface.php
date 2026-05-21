<?php

namespace App\Encoder;

interface EncoderInterface
{
    public function decode(string $data): array;
    public function encode(array $data): string;
}