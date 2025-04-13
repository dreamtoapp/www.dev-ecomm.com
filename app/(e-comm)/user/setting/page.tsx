"use client"
import {
  useEffect,
  useState,
} from 'react'

import { Settings } from 'lucide-react'
import { useTheme } from 'next-themes'
import {
  FiAlertCircle,
  FiCheckCircle,
  FiEye,
  FiEyeOff,
  FiLoader,
  FiLock,
  FiMoon,
  FiSun,
  FiUser,
} from 'react-icons/fi'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'

import { changePassword } from './action/changePasswod'

export default function SettingsPage() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-8 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 flex items-center gap-2">
        <Settings className="w-6 h-6 text-muted" />
        الإعدادات
      </h1>

      <div className="space-y-6">
        <AppearanceSection theme={theme} setTheme={setTheme} mounted={mounted} />

        <AccountSection />

        <Card>

        </Card>
      </div>
    </div>
  )
}

// Appearance Section
const AppearanceSection = ({ theme, setTheme, mounted }: {
  theme: string | undefined
  setTheme: (theme: string) => void
  mounted: boolean
}) => {
  const isDark = theme === "dark"
  const currentThemeLabel = isDark ? "الوضع الليلي" : "الوضع النهاري"
  const ThemeIcon = isDark ? FiMoon : FiSun

  return (
    <Card className={`transition-colors ${isDark ? 'bg-neutral-50/5 border-neutral-800' : 'border-neutral-100'}`}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ThemeIcon className={`w-5 h-5 transition-colors ${isDark ? 'text-amber-400' : 'text-amber-600'}`} />
          <span className="transition-colors">
            {currentThemeLabel}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between p-4 rounded-lg bg-muted/10">
          <div className="space-y-1.5">
            <div className="flex items-center gap-3">
              <Label htmlFor="dark-mode" className="text-base font-medium">
                تفعيل الوضع الليلي
              </Label>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {isDark ?
                "مفعل حالياً - واجهة مريحة للاستخدام الليلي" :
                "غير مفعل - واجهة ملائمة للاستخدام النهاري"}
            </p>
          </div>

          {mounted && (
            <Switch
              id="dark-mode"
              checked={isDark}
              onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
              className="relative rounded-full data-[state=checked]:bg-amber-500 data-[state=unchecked]:bg-neutral-300 dark:data-[state=unchecked]:bg-neutral-700"
              style={{ transition: 'background 0.2s' }}
            >
              <span className="absolute top-1 left-1 w-4 h-4 bg-white rounded-full shadow-sm transform transition-transform duration-200 data-[state=checked]:translate-x-5" />
            </Switch>
          )}
        </div>

        <div className="mt-4 text-sm text-muted-foreground">
          <p>الإعدادات الحالية:</p>
          <div className="flex items-center gap-2 mt-1.5">
            <span className="px-2 py-1 rounded-md bg-muted text-foreground/80">
              {theme === "dark" ? "Dark" : "Light"} Mode
            </span>
            <span className="text-xs opacity-70">
              ({currentThemeLabel})
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

// Account Section




const AccountSection = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [notification, setNotification] = useState<{
    message: string
    type: 'success' | 'error'
  } | null>(null)

  const handlePasswordChange = async () => {
    if (!password) {
      setNotification({
        message: 'يرجى إدخال كلمة مرور جديدة',
        type: 'error'
      })
      return
    }

    if (password.length < 6) {
      setNotification({
        message: 'كلمة المرور يجب أن تحتوي على الأقل 6 أحرف',
        type: 'error'
      })
      return
    }

    try {
      setIsLoading(true)
      await changePassword(password)
      setNotification({
        message: 'تم تحديث كلمة المرور بنجاح',
        type: 'success'
      })
      setPassword("")
    } catch (error) {
      setNotification({
        message: 'فشل تحديث كلمة المرور. يرجى التأكد من متطلبات الأمان',
        type: 'error'
      })
    } finally {
      setIsLoading(false)
      setTimeout(() => setNotification(null), 5000)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FiUser className="w-5 h-5" />
          إدارة الحساب
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {notification && (
          <div className={`p-4 rounded-lg flex items-start gap-3 ${notification.type === 'success'
            ? 'bg-green-50 border border-green-200 text-green-800'
            : 'bg-red-50 border border-red-200 text-red-800'
            }`}>
            {notification.type === 'success' ? (
              <FiCheckCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
            ) : (
              <FiAlertCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
            )}
            <div className="flex-1">
              <p className="font-medium">{notification.message}</p>
              {notification.type === 'success' && (
                <p className="text-sm mt-2 text-green-700 leading-relaxed">
                  سيتم تفعيل كلمة المرور الجديدة بشكل كامل في المرة القادمة التي تقوم فيها بتسجيل الدخول إلى النظام.
                </p>
              )}
              {notification.type === 'error' && (
                <p className="text-sm mt-2 text-red-700 leading-relaxed">
                  يرجى التأكد من احتواء كلمة المرور على مزيج من الأحرف والأرقام والرموز.
                </p>
              )}
            </div>
          </div>
        )}

        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <FiLock className="w-4 h-4" />
            <Label htmlFor="password">كلمة المرور الجديدة</Label>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative w-full">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="أدخل كلمة المرور الجديدة"
                className="bg-muted pr-10"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                onClick={() => setShowPassword(!showPassword)}
                disabled={isLoading}
              >
                {showPassword ? (
                  <FiEyeOff className="h-4 w-4" />
                ) : (
                  <FiEye className="h-4 w-4" />
                )}
                <span className="sr-only">إظهار/إخفاء كلمة المرور</span>
              </Button>
            </div>
            <Button
              variant="secondary"
              onClick={handlePasswordChange}
              disabled={isLoading || !password}
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <FiLoader className="h-4 w-4 animate-spin" />
                  جاري التطبيق...
                </div>
              ) : (
                'تحديث كلمة المرور'
              )}
            </Button>
          </div>
          <div className="text-sm text-muted-foreground space-y-1">
            <p>متطلبات أمان كلمة المرور:</p>
            <ul className="list-disc pr-4">
              <li>6 أحرف على الأقل</li>

            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

