"use client";

import { ReactNode } from "react";

import { AlertTriangle, CheckCircle, Info, XCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import { BaseDialog } from "../base/base-dialog";

export type ConfirmType = "danger" | "warning" | "info" | "success";

interface ConfirmDialogProps {
  /**
   * عنوان الديالوغ
   */
  title?: string;
  /**
   * رسالة التأكيد
   */
  message: string | ReactNode;
  /**
   * نوع التأكيد (يحدد الألوان والأيقونة)
   */
  type?: ConfirmType;
  /**
   * نص زر التأكيد
   */
  confirmText?: string;
  /**
   * نص زر الإلغاء
   */
  cancelText?: string;
  /**
   * حالة فتح/إغلاق الديالوغ
   */
  isOpen: boolean;
  /**
   * دالة التأكيد
   */
  onConfirm: () => void | Promise<void>;
  /**
   * دالة الإلغاء
   */
  onCancel?: () => void;
  /**
   * حالة التحميل
   */
  isLoading?: boolean;
  /**
   * حجم الديالوغ
   */
  size?: "sm" | "md" | "lg" | "xl" | "full";
  /**
   * وضع ملء الشاشة
   */
  fullScreen?: boolean;
  /**
   * إخفاء الفواصل
   */
  hideDividers?: boolean;
  /**
   * منع الإغلاق عند النقر خارج الديالوغ
   */
  preventCloseOnOutsideClick?: boolean;
  /**
   * محتوى مخصص بدلاً من الرسالة الافتراضية
   */
  children?: ReactNode;
  /**
   * أزرار مخصصة بدلاً من الأزرار الافتراضية
   */
  customButtons?: ReactNode;
}

const defaultConfig = {
  danger: {
    title: "confirm.delete.title",
    confirmText: "confirm.delete.confirmText",
    cancelText: "confirm.cancelText",
    icon: XCircle,
    confirmVariant: "destructive" as const,
    cancelVariant: "outline" as const,
    iconClassName: "text-destructive",
    iconBgClassName: "bg-destructive/10 dark:bg-destructive/20",
    confirmButtonClassName: "",
  },
  warning: {
    title: "confirm.warning.title",
    confirmText: "confirm.warning.confirmText",
    cancelText: "confirm.cancelText",
    icon: AlertTriangle,
    confirmVariant: "default" as const,
    cancelVariant: "outline" as const,
    iconClassName: "text-yellow-600 dark:text-yellow-500",
    iconBgClassName: "bg-yellow-500/10 dark:bg-yellow-500/20",
    confirmButtonClassName:
      "bg-yellow-600 text-white hover:bg-yellow-700 dark:bg-yellow-500 dark:hover:bg-yellow-600 focus-visible:ring-yellow-500/20 dark:focus-visible:ring-yellow-500/40",
  },
  info: {
    title: "confirm.info.title",
    confirmText: "confirm.info.confirmText",
    cancelText: "confirm.cancelText",
    icon: Info,
    confirmVariant: "default" as const,
    cancelVariant: "outline" as const,
    iconClassName: "text-blue-600 dark:text-blue-400",
    iconBgClassName: "bg-blue-500/10 dark:bg-blue-500/20",
    confirmButtonClassName:
      "bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 focus-visible:ring-blue-500/20 dark:focus-visible:ring-blue-500/40",
  },
  success: {
    title: "confirm.success.title",
    confirmText: "confirm.success.confirmText",
    cancelText: "confirm.cancelText",
    icon: CheckCircle,
    confirmVariant: "default" as const,
    cancelVariant: "outline" as const,
    iconClassName: "text-green-600 dark:text-green-500",
    iconBgClassName: "bg-green-500/10 dark:bg-green-500/20",
    confirmButtonClassName:
      "bg-green-600 text-white hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 focus-visible:ring-green-500/20 dark:focus-visible:ring-green-500/40",
  },
};

export function ConfirmDialog({
  title,
  message,
  type = "warning",
  confirmText,
  cancelText,
  isOpen,
  onConfirm,
  onCancel,
  isLoading = false,
  size = "md",
  fullScreen = false,
  hideDividers = false,
  preventCloseOnOutsideClick = false,
  children,
  customButtons,
}: ConfirmDialogProps) {
  const config = defaultConfig[type];
  const IconComponent = config.icon;

  const handleConfirm = async () => {
    if (!isLoading) {
      await onConfirm();
    }
  };

  const handleCancel = () => {
    if (!isLoading && onCancel) {
      onCancel();
    }
  };

  const defaultButtons = (
    <div className="flex gap-2">
      <Button
        variant={config.cancelVariant}
        onClick={handleCancel}
        disabled={isLoading}
      >
        {cancelText || config.cancelText}
      </Button>
      <Button
        variant={config.confirmVariant}
        className={cn(config.confirmButtonClassName)}
        onClick={handleConfirm}
        disabled={isLoading}
      >
        {isLoading ? "confirm.loading" : confirmText || config.confirmText}
      </Button>
    </div>
  );

  const content =
    children || typeof message === "string" ? (
      <div className="flex items-start gap-3">
        <div className={`shrink-0 rounded-full p-2 ${config.iconBgClassName}`}>
          <IconComponent className={`h-5 w-5 ${config.iconClassName}`} />
        </div>
        <div className="flex-1">
          <p className="text-muted-foreground text-sm">{message}</p>
        </div>
      </div>
    ) : (
      message
    );

  return (
    <BaseDialog
      title={title || config.title}
      isOpen={isOpen}
      onClose={handleCancel}
      size={size}
      fullScreen={fullScreen}
      hideDividers={hideDividers}
      preventCloseOnOutsideClick={preventCloseOnOutsideClick}
      actionButtons={customButtons || defaultButtons}
    >
      {content}
    </BaseDialog>
  );
}
