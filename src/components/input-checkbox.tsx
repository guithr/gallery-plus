import Icon from "./icon";
import { tv, type VariantProps } from "tailwind-variants";
import CheckIcon from "../assets/icons/check.svg?react"

export const InputCheckboxWrapperVariants = tv({
    base: `
    inline-flex items-center justify-center relative group
    `
})

export const InputCheckboxVariants = tv({
    base: `
    flex items-center justify-center 
    appearance-none peer
    transition overflow-hidden
    cursor-pointer
    `,
    variants: {
        variant: {
            default: `
            border-2 border-solid
            border-border-primary
            hover:border-border-active
            checked:border-accent-brand checked:bg-accent-brand
            group-hover:checked:border-accent-brand-light
            group-hover:checked:bg-accent-brand-light
            `
        },
        size: {
            sm: "size-3 rounded-sm",
            md: "size-5 rounded-sm"
        },
        disabled: {
            true: "pointer-events-none"
        }
    },
    defaultVariants: {
        variant: "default",
        size: "md",
        disabled: false
    }
})

export const InputCheckboxIconVariants = tv({
    base: `
        absolute top-1/2 -translate-y-1/2
        hidden peer-checked:block
        fill-white
        cursor-pointer
    `,
    variants: {
        size: {
            sm: "size-3 left-px",
            md: "size-4 left-0.5"
        }
    },
    defaultVariants: {
        size: "md"
    }
})

interface InputTextProps extends VariantProps<typeof InputCheckboxVariants>, Omit<React.ComponentProps<"input">, "size" | "disabled"> { }


export default function InputCheckbox({ variant, size, disabled, className, ...props }: InputTextProps) {
    return (
        <label className={InputCheckboxWrapperVariants({className})}>
            <input type="checkbox" {...props} className={InputCheckboxVariants({ variant, size, disabled })} />
            <Icon svg={CheckIcon} className={InputCheckboxIconVariants({ size })} />
        </label>
    )
}