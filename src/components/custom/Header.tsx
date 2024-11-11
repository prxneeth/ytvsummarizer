import Link from "next/link";
import { Logo } from "./Logo";
import { Button } from "@/components/ui/button";
import { getUserMeLoader } from "@/data/services/get-user-me-loader";
import { LogoutButton } from "./LogoutButton";
import { SummaryForm } from "../forms/SummaryForm";

interface AuthUserProps {
  username: string;
  email: string;
}

export function LoggedInUser({
  userData,
}: {
  readonly userData: AuthUserProps;
}) {
  return (
    <div className="flex gap-2">
      <Link
        href="/dashboard/account"
        className="font-semibold hover:text-primary"
      >
        {userData.username}
      </Link>
      <LogoutButton />
    </div>
  );
}

interface HeaderProps {
  data: {
    header: {
      logoText: {
        id: number;
        text: string;
        url: string;
      };
      ctaButton: {
        id: number;
        text: string;
        url: string;
      };
    };
  };
}

export async function Header({ data }: Readonly<HeaderProps>) {
  const user = await getUserMeLoader();
  // console.log(user);

  if (!data || !data.header) {
    console.warn("Header data is missing or incomplete:", data);
    return null;
  }

  const { logoText, ctaButton } = data.header;

  return (
    <div className="flex items-center justify-between px-4 py-3 bg-white shadow-md dark:bg-gray-800">
      <Logo text={logoText.text} />
      {user.ok && <SummaryForm />}
      <div className="flex items-center gap-4">
        {user.ok ? (
          <LoggedInUser userData={user.data} />
        ) : (
          <Link href={ctaButton.url}>
            <Button>{ctaButton.text}</Button>
          </Link>
        )}
      </div>
    </div>
  );
}
