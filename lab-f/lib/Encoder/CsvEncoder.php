<?php
namespace App\Encoder;

class CsvEncoder implements EncoderInterface {
    private string $separator;

    public function __construct(string $format) {
        if ($format === 'SSV') $this->separator = ';';
        elseif ($format === 'TSV') $this->separator = "\t";
        else $this->separator = ',';
    }

    public function decode(string $data): array {
        $lines = explode("\n", trim($data));
        $headers = str_getcsv(array_shift($lines), $this->separator, '"', '');
        $result = [];
        foreach ($lines as $line) {
            if (trim($line) === '') continue;
            $result[] = array_combine($headers, str_getcsv($line, $this->separator, '"', ''));
        }
        return $result;
    }

    public function encode(array $data): string {
        if (empty($data)) return '';
        $handle = fopen('php://temp', 'r+');
        fputcsv($handle, array_keys($data[0]), $this->separator, '"', '');
        foreach ($data as $row) {
            fputcsv($handle, $row, $this->separator, '"', '');
        }
        rewind($handle);
        return rtrim(stream_get_contents($handle), "\r\n");
    }

}