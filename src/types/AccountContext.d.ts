interface AccountContext {
  account: Account | null;
  setAccount: React.Dispatch<React.SetStateAction<Account | null>>;
}
