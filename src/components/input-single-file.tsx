import { tv, type VariantProps } from "tailwind-variants";
import Text, { textVariants } from "./text";
import Icon from "./icon";
import UploadFileIcon from "../assets/icons/upload-file.svg?react"
import FileImageIcon from "../assets/icons/image.svg?react"


export const InputSingleFileVariants = tv({
    base: `
    flex flex-col items-center justify-center gap-1
    w-full
    border border-solid border-border-primary rounded-lg
    group-hover:border-border-active
    transition
    `,
    variants: {
        size: {
            md: "px-5 py-6"
        }
    },
    defaultVariants: {
        size: "md"
    }
})

export const InputSingleFileIconVariants = tv({
    base: `
    fill-placeholder
    `,
    variants: {
        size: {
            md: "size-8"

        }
    },
    defaultVariants: {
        size: "md"
    }
})

interface InputSingleFileProps extends VariantProps<typeof InputSingleFileVariants>,
    Omit<React.ComponentProps<"input">, "size"> {
    error?: React.ReactNode
}

export default function InputSingleFile({ size, error }: InputSingleFileProps) {
    return (
        <div>

            <div className="w-full relative group cursor-pointer">
                <input type="file"
                    className={`
                    w-full h-full
                    absolute top-0 right-0
                    opacity-0 cursor-pointer
                `}
                />
                <div className={InputSingleFileVariants({ size })}>
                    <Icon svg={UploadFileIcon} className={InputSingleFileIconVariants({ size })} />
                    <Text variant="label-medium" className="text-placeholder text-center">Arraste o arquivo aqui<br /> ou clique para selecionar</Text>
                </div>
            </div>
            {error && <Text variant="label-small" className="text-accent-red">Error</Text>}

            <div className={`
                flex gap-3 items-center
                border border-solid border-border-primary rounded
                p-3 mt-5`}>
                <Icon svg={FileImageIcon} className="fill-white size-6" />
                <div className="flex flex-col">
                    <div className="truncate max-w-80">
                        <Text variant="label-medium" className="text-placeholder"> Nome do arquivo.png</Text>
                    </div>
                    <div className="flex">
                        <button type="button" className={textVariants({
                            variant: "label-small",
                            className: "text-accent-red cursor-pointer hover:underline"
                        })}>
                            Remover
                        </button>
                    </div>
                </div>

            </div>
        </div>
    )
}