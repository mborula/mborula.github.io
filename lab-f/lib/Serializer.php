<?php
namespace App;

use App\Encoder\EncoderInterface;
use App\Encoder\CsvEncoder;
use App\Encoder\JsonEncoder;
use App\Encoder\YamlEncoder;

class Serializer {
    public function convert(string $data, string $fromFormat, string $toFormat): string {
        if (empty(trim($data))) return '';
        if ($fromFormat === $toFormat) return $data;
        $decoder = $this->getEncoder($fromFormat);
        $arrayData = $decoder->decode($data);

        $encoder = $this->getEncoder($toFormat);
        return $encoder->encode($arrayData);
    }

    private function getEncoder(string $format): EncoderInterface {
        switch ($format) {
            case 'CSV':
            case 'SSV':
            case 'TSV':
                return new CsvEncoder($format);
            case 'JSON':
                return new JsonEncoder();
            case 'YAML':
                return new YamlEncoder();
            default:
                throw new \InvalidArgumentException("Niewspierany format: $format");
        }
    }
}