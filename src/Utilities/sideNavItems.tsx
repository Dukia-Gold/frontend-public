export type sideNavItemsType = {
  title: string;
  route: string | null;
  keywords?: string[];
  isActive?: boolean;
  otherOptions: {
    isActive: boolean;
    data: { title: string; route: string; isLive: boolean }[];
  } | null;
}[];

export const sideNavItems: sideNavItemsType = [
  {
    title: "Dashboard",
    route: "/dashboard",
    keywords: ["", "dashboard"],
    isActive: true,
    otherOptions: null,
  },
  {
    title: "Buy Gold",
    route: null,
    keywords: [
      "buy-dukia-gold-coins",
      "buy-dukia-gold-bars",
      "buy-dukia-pool-allocated-gold",
    ],
    isActive: false,
    otherOptions: {
      isActive: false,
      data: [
        { title: "Gold Bars", route: "/user/buy-dukia-gold", isLive: true },
        {
          title: "Gold Coins",
          route: "/user/buy-dukia-gold-coins",
          isLive: true,
        },
        {
          title: "Pool Allocated Gold",
          route: "/user/buy-pool-allocated-gold",
          isLive: true,
        },
      ],
    },
  },
  {
    title: "Deposit/Withdraw",
    route: null,
    keywords: ["deposit", "withdraw"],
    isActive: false,
    otherOptions: {
      isActive: false,
      data: [
        { title: "Deposit", route: "/deposit", isLive: true },
        { title: "Withdraw", route: "/withdraw", isLive: true },
      ],
    },
  },
  {
    title: "Gold Holdings",
    route: "/user-portfolio",
    keywords: ["user-portfolio"],
    isActive: true,
    otherOptions: null,
  },

  {
    title: "Transaction History",
    route: "/transaction-history",
    keywords: ["transaction-history"],
    isActive: true,
    otherOptions: null,
  },

  {
    title: "Gift Gold (coming soon)",
    route: "/notifications",
    keywords: ["notifications"],
    isActive: false,
    otherOptions: null,
  },

  {
    title: "Gold Investment Plan (coming soon)",
    route: "/notifications",
    keywords: ["notifications"],
    isActive: false,
    otherOptions: null,
  },

  {
    title: "Billings",
    route: null,
    keywords: ["storage", "deliveries"],
    isActive: false,
    otherOptions: {
      isActive: false,
      data: [
        { title: "Storage", route: "/storage", isLive: false },
        { title: "Deliveries", route: "/deliveries", isLive: false },
      ],
    },
  },

  {
    title: "Your Account",
    route: null,
    keywords: [
      "profile",
      "referrals",
      "deactivate-account",
      "statement-of-account",
    ],
    isActive: false,
    otherOptions: {
      isActive: false,
      data: [
        { title: "Account Information", route: "/profile", isLive: true },
        {
          title: "Statement of Account",
          route: "/statement-of-account",
          isLive: true,
        },

        { title: "Referrals", route: "/referrals", isLive: false },
        {
          title: "Deactivate Account",
          route: "/deactivete-account",
          isLive: false,
        },
      ],
    },
  },
  {
    title: "Security",
    route: null,
    keywords: ["2-fa", "change-password"],
    isActive: false,
    otherOptions: {
      isActive: false,
      data: [
        { title: "Change password", route: "/change-password", isLive: true },
        { title: "Two-Factor Authentication", route: "/2-fa", isLive: false },
        { title: "Logout from all Devices", route: "/2-fa", isLive: false },
      ],
    },
  },

  {
    title: "Settings",
    route: "/settings",
    keywords: ["settings"],
    isActive: false,
    otherOptions: null,
  },
  {
    title: "Get Help",
    route: null,
    keywords: ["call-us", "email-us", "live-chat", "faqs"],
    isActive: false,
    otherOptions: {
      isActive: false,
      data: [
        { title: "Call us", route: "/call-us", isLive: true },
        { title: "E-mail Us", route: "/email-us", isLive: true },
        { title: "FAQs", route: "/faqs", isLive: true },
      ],
    },
  },

  {
    title: "Legal",
    route: null,
    keywords: ["privacy-settings", "terms-and-conditions"],
    isActive: false,
    otherOptions: {
      isActive: false,
      data: [
        {
          title: "Terms and Conditions",
          route: "/user/terms-and-conditions",
          isLive: true,
        },
        {
          title: "Privacy Policy",
          route: "/user/privacy-statement",
          isLive: true,
        },
      ],
    },
  },
];
