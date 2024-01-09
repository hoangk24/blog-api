import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreatePostDto {
  @ApiProperty({
    example:
      'Nhật Bản thắng hủy diệt đối thủ trước trận gặp đội tuyển Việt Nam',
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    example:
      'Bằng lối đá hiệu quả, Nhật Bản đã dễ dàng ghi 6 bàn vào lưới Jordan. Những ngôi sao hàng đầu như Takumi Minamino, Takuma Asano hay Daizen Maeda đều đã điền tên lên bảng tỷ số với những pha phối hợp rất nhuyễn và đa dạng.Dẫn đối thủ 6-0 trong gần 90 phút, đội tuyển Nhật Bản chỉ để Jordan có 1 bàn danh dự ở cuối hiệp 2. Thắng chung cuộc 6-1, như vậy đoàn quân của HLV Moriyasu cũng đã có màn chạy đà cực kì hoàn hảo trước thềm Asian Cup 2023. Tính ra đây cũng là chiến thắng thứ 10 liên tiếp mà đội bóng xứ hoa Anh đào giành được trong thời gian qua.',
  })
  @IsString()
  content: string;

  @ApiProperty({
    example: 'Nhật Bản thắng hủy diệt đối thủ trước',
  })
  @IsNotEmpty()
  shortTitle: string;

  @ApiProperty({ type: 'integer', isArray: true, example: [1] })
  @IsNumber({}, { each: true })
  tags: number[];

  @ApiProperty({
    example:
      'https://image.bongda24h.vn/medias/640x359twebp/original/2024/01/09/nhat-ban-0901212409.jpg',
  })
  @IsString()
  thumbnail: string;

  @ApiProperty({
    example:
      'https://image.bongda24h.vn/medias/640x359twebp/original/2024/01/09/nhat-ban-0901212409.jpg',
  })
  @IsString()
  poster: string;

  @ApiProperty({ example: 'nhat-ban-thang-huy-diet' })
  @IsString()
  slug: string;
}
