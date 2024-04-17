'use client'
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import Header from "@/components/ui/header";

interface CardWraperProps {
  children: React.ReactNode
  headerLabel: String,
  backButtonLabel: String,
  backButtonHref: String,
  footerContent: React.ReactNode
}

export default function CardWraper({ children,
  headerLabel,
  backButtonLabel,
  backButtonHref,
  footerContent
}: CardWraperProps) {
  return (
    <Card className="w-[400px] shadow-md">
      <CardHeader>
        <Header title={'Auth'} label={headerLabel} />
      </CardHeader>
      <CardContent>
        {children}
      </CardContent>
      {footerContent && (
        <CardFooter>
          {footerContent}
        </CardFooter>
      )}
    </Card>
  );
}