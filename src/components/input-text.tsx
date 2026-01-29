import { tv, type VariantProps } from "tailwind-variants";
import Icon from "./icon";
import Text from "./text";

export const InputTextContainerVariants = tv({
    base: "flex flex-col gap-1"
})

export const InputTextWrapperVariants = tv({
    base: `
    flex items-center gap-3
    bg-transparent
    rounded
    border border-solid border-border-primary
    focus:border-border-active
    `,
    variants: {
        size: {
            md: "h-10 p-3"
        },
        disabled: {
            true: "pointer-events-none"
        }
    },
    defaultVariants: {
        size: "md",
        disabled: false
    }
})

export const InputTextVariants = tv({
    base: `
        bg-transparent outline-none placeholder:text-placeholder
        text-accent-paragraph flex-1
    `
})

export const InputTextIconVariants = tv({
    base: `
        fill-placeholder
    `,
    variants: {
        size: {
            md: "size-6"
        }
    },
    defaultVariants: {
        size: "md"
    }
})

interface InputTextProps extends VariantProps<typeof InputTextWrapperVariants>, Omit<React.ComponentProps<"input">, "size" | "disabled"> {
    icon?: React.ComponentProps<typeof Icon>["svg"],
    error?: React.ReactNode
}

export default function InputText({ size, disabled, icon, error, className, ...props }: InputTextProps) {
    return (
        <div className={InputTextContainerVariants({ className })}>
            <div className={InputTextWrapperVariants({ size, disabled })}>
                {icon && <Icon svg={icon} className={InputTextIconVariants()} />}
                <input className={InputTextVariants()} disabled={disabled as boolean} {...props} />
            </div>
            {error && <Text variant="label-small" className="text-accent-red">{error}</Text>}
        </div >
    )
}