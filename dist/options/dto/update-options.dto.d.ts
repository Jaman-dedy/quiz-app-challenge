import { CreateOptionsDto } from './create-options.dto';
declare const UpdateOptionDto_base: import("@nestjs/common").Type<Partial<CreateOptionsDto>>;
export declare class UpdateOptionDto extends UpdateOptionDto_base {
    title: string;
    isCorrect?: boolean;
}
export {};
