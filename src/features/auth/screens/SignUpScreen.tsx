import { Link } from "expo-router";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export function SignUpScreen() {
  return (
    <SafeAreaView
      className="flex-1 bg-white dark:bg-black"
      edges={["top", "bottom"]}
    >
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
        >
          <View className="flex-1 px-6 py-8">
            <View className="mt-8 gap-2">
              <Text className="text-3xl font-bold text-zinc-900 dark:text-zinc-100">
                Đăng ký
              </Text>
              <Text className="text-base text-zinc-600 dark:text-zinc-400">
                Tạo tài khoản để bắt đầu sử dụng ứng dụng.
              </Text>
            </View>

            <View className="mt-8 gap-5">
              <View className="gap-2">
                <Text className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                  Họ và tên
                </Text>
                <TextInput
                  placeholder="Nguyễn Văn A"
                  autoCapitalize="words"
                  placeholderTextColor="#9ca3af"
                  className="min-h-12 rounded-xl border border-zinc-300 bg-white px-4 py-3 text-base text-zinc-900 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100"
                />
              </View>

              <View className="gap-2">
                <Text className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                  Email
                </Text>
                <TextInput
                  placeholder="you@example.com"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                  textContentType="emailAddress"
                  placeholderTextColor="#9ca3af"
                  className="min-h-12 rounded-xl border border-zinc-300 bg-white px-4 py-3 text-base text-zinc-900 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100"
                />
              </View>

              <View className="gap-2">
                <Text className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                  Mật khẩu
                </Text>
                <TextInput
                  placeholder="Nhập mật khẩu"
                  secureTextEntry
                  autoCapitalize="none"
                  autoCorrect={false}
                  textContentType="newPassword"
                  placeholderTextColor="#9ca3af"
                  className="min-h-12 rounded-xl border border-zinc-300 bg-white px-4 py-3 text-base text-zinc-900 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100"
                />
              </View>

              <View className="gap-2">
                <Text className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                  Xác nhận mật khẩu
                </Text>
                <TextInput
                  placeholder="Nhập lại mật khẩu"
                  secureTextEntry
                  autoCapitalize="none"
                  autoCorrect={false}
                  textContentType="newPassword"
                  placeholderTextColor="#9ca3af"
                  className="min-h-12 rounded-xl border border-zinc-300 bg-white px-4 py-3 text-base text-zinc-900 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100"
                />
              </View>

              <Pressable className="min-h-12 items-center justify-center rounded-xl bg-zinc-900 px-4 dark:bg-zinc-100">
                <Text className="text-base font-semibold text-white dark:text-black">
                  Đăng ký
                </Text>
              </Pressable>
            </View>

            <View className="mt-6 flex-row items-center justify-center gap-1">
              <Text className="text-sm text-zinc-600 dark:text-zinc-400">
                Đã có tài khoản?
              </Text>
              <Link href="/(public)/sign-in" asChild>
                <Text className="text-sm font-semibold text-blue-600 dark:text-blue-400">
                  Đăng nhập
                </Text>
              </Link>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
