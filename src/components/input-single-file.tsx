import { tv, type VariantProps } from "tailwind-variants";
import Text, { textVariants } from "./text";
import Icon from "./icon";
import UploadFileIcon from "../assets/icons/upload-file.svg?react"
import FileImageIcon from "../assets/icons/image.svg?react"
import { useWatch } from "react-hook-form"
import React from "react";


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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    form: any
    error?: React.ReactNode
    allowedExtensions: string[]
    maxFileSizeInMB: number;
}

export default function InputSingleFile({ form, size, error, allowedExtensions, maxFileSizeInMB, ...props }: InputSingleFileProps) {

    const formValues = useWatch({ control: form.control })
    const name = props.name || "";
    const formFile: File = React.useMemo(() => formValues[name]?.[0], [formValues, name])
    const { fileExtension, fileSize } = React.useMemo(() => ({
        fileExtension: formFile?.name?.split(".")?.pop()?.toLowerCase() || "",
        fileSize: formFile?.size || 0
    }), [formFile])

    function isValidExtension() {
        return allowedExtensions.includes(fileExtension)
    }
    function isValidSize() {
        return fileSize <= maxFileSizeInMB * 1024 * 1024
    }
    function isValidFile() {
        return isValidExtension() && isValidSize();
    }

    return (
        <div>
            {!formFile || !isValidFile() ?
                (
                    <>
                        <div className="w-full relative group cursor-pointer">
                            <input type="file"
                                className={`
                                w-full h-full
                                absolute top-0 right-0
                                opacity-0 cursor-pointer
                        `}
                                {...props}
                            />
                            <div className={InputSingleFileVariants({ size })}>
                                <Icon svg={UploadFileIcon} className={InputSingleFileIconVariants({ size })} />
                                <Text variant="label-medium" className="text-placeholder text-center">Arraste o arquivo aqui<br /> ou clique para selecionar</Text>
                            </div>
                        </div>
                        <div className="flex flex-col gap-1 mt-1">
                            {formFile && !isValidExtension() &&
                                <Text variant="label-small" className="text-accent-red">Tipo de arquivo inválido</Text>
                            }
                            {formFile && !isValidSize() &&
                                <Text variant="label-small" className="text-accent-red">Tamanho do arquivo ultrapassa o máximo</Text>
                            }
                            {error && (<Text variant="label-small" className="text-accent-red">{error}</Text>)}
                        </div>
                    </>
                ) : (
                    <div className={`
                        flex gap-3 items-center
                        border border-solid border-border-primary rounded
                        p-3 mt-5`
                    }>
                        <Icon svg={FileImageIcon} className="fill-white size-6" />
                        <div className="flex flex-col">
                            <div className="truncate max-w-80">
                                <Text variant="label-medium" className="text-placeholder"> {formFile.name}</Text>
                            </div>
                            <div className="flex">
                                <button type="button" className={textVariants({
                                    variant: "label-small",
                                    className: "text-accent-red cursor-pointer hover:underline"
                                })} onClick={() => { form.setValue(name, undefined) }}>
                                    Remover
                                </button>
                            </div>
                        </div>

                    </div >
                )
            }
        </div >
    )
}