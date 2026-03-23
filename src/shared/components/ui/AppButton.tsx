import { ActivityIndicator, Pressable, Text } from "react-native";

type AppButtonProps = {
  label: string;
  onPress: () => void;
  loading?: boolean;
  variant?: "primary" | "secondary" | "danger";
  disabled?: boolean;
};

const buttonVariants = {
  primary: "bg-brand-600 active:bg-brand-700",
  secondary:
    "bg-slate-200 active:bg-slate-300 dark:bg-slate-800 dark:active:bg-slate-700",
  danger: "bg-red-500 active:bg-red-600",
};

const textVariants = {
  primary: "text-white",
  secondary: "text-slate-900 dark:text-slate-100",
  danger: "text-white",
};

export function AppButton({
  label,
  onPress,
  loading = false,
  variant = "primary",
  disabled = false,
}: AppButtonProps) {
  const isDisabled = disabled || loading;

  return (
    <Pressable
      onPress={onPress}
      disabled={isDisabled}
      className={`min-h-12 items-center justify-center rounded-xl px-4 ${
        buttonVariants[variant]
      } ${isDisabled ? "opacity-50" : ""}`}
    >
      {loading ? (
        <ActivityIndicator />
      ) : (
        <Text className={`text-base font-semibold ${textVariants[variant]}`}>
          {label}
        </Text>
      )}
    </Pressable>
  );
}
