import * as DialogPrimitive from "@radix-ui/react-dialog"
import XIcon from "../assets/icons/x.svg?react";
import type React from "react";
import Card from "./card";
import cn from "classnames"
import Text from "./text";
import ButtonIcon from "./button-icon";
import Divider from "./divider";

export const Dialog = DialogPrimitive.Root;
export const DialogTrigger = DialogPrimitive.Trigger
export const DialogClose = DialogPrimitive.Close


export function DialogOverlay({ className, ...props }: React.ComponentProps<typeof DialogPrimitive.Overlay>) {
    return (
        <DialogPrimitive.Overlay
            className={cn(`
                fixed inset-0 z-40
                bg-background-secondary/60
                backdrop-blur-sm
                data-[state=open]:anime-in
                data-[state=closed]:anime-out
                data-[state=open]:fade-in-0
                data-[state=closed]:fade-out-0
        `, className)}
            {...props} />
    )
}

export function DialogContent({
    className,
    ref,
    children,
    ...props }: React.ComponentProps<typeof DialogPrimitive.Content>) {
    return (
        <DialogPrimitive.Portal>
            <DialogOverlay />
            <DialogPrimitive.Content
                ref={ref}
                className={cn(`
                    fixed z-50 
                    left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]
                    w-full max-w-[32rem]
                    data-[state=open]:animate-in
                    data-[state=open]:slide-in-from-bottom-[48%]
                    data-[state=open]:fade-in-0
                    data-[state=closed]:animate-out
                    data-[state=closed]:slide-out-from-bottom-[48%]
                    data-[state=closed]:fade-out-0
                    `, className)} {...props}>
                <Card size="lg" variant="primary">
                    {children}
                </Card>
            </DialogPrimitive.Content>

        </DialogPrimitive.Portal>
    )
}

export function DialogHeader({ className, children, ...props }: React.ComponentProps<"div">) {
    return (
        <>
            <header className={cn(`
            flex items-center justify-between
        `, className)} {...props}>
                <DialogPrimitive.Title>
                    <Text variant="heading-medium" className="flex-1">
                        {children}
                    </Text>
                </DialogPrimitive.Title>
                <DialogClose asChild>
                    <ButtonIcon icon={XIcon} variant="ghost" />
                </DialogClose>
            </header>
            <Divider className="mt-1.5 mb-5" />
        </>
    )
}

export function DialogBody({ children, ...props }: React.ComponentProps<"div">) {
    return (
        <div {...props}>
            {children}
        </div>
    )
}


export function DialogFooter({ children, ...props }: React.ComponentProps<"div">) {
    return (
        <div  {...props}>
            <Divider className="mt-5 mb-1.5" />
            <footer className="flex items-center justify-end gap-3">
                {children}
            </footer>
        </div>
    )
}

