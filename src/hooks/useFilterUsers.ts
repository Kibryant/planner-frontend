import type { User } from "@/store/user-store";
import { useState, useCallback, useEffect } from "react";

export function useFilterUsers(users: User[]) {
  const [searchEmail, setSearchEmail] = useState("");
  const [purchaseDate, setPurchaseDate] = useState<Date | undefined>(undefined);
  const [filteredUsers, setFilteredUsers] = useState<User[]>(users);

  const handleFilter = useCallback(() => {
    if (searchEmail.length === 0 && !purchaseDate) {
      setFilteredUsers(users);
      return;
    }

    const filtered = users.filter((user) => {
      const matchesEmail =
        searchEmail.length === 0 ||
        user.email.toLowerCase().includes(searchEmail.toLowerCase());

      const matchesDate =
        !purchaseDate ||
        (() => {
          const actualDate = new Date(purchaseDate);
          const userPurchaseDate = new Date(user.purchaseDate);
          const userExpirationDate = new Date(user.expirationDate);

          return (
            !Number.isNaN(userPurchaseDate.getTime()) &&
            !Number.isNaN(userExpirationDate.getTime()) &&
            userPurchaseDate >= actualDate &&
            userExpirationDate >= actualDate
          );
        })();

      return matchesEmail && matchesDate;
    });

    setFilteredUsers(filtered);
  }, [searchEmail, purchaseDate, users]);

  useEffect(() => {
    handleFilter();
  }, [handleFilter]);

  return {
    searchEmail,
    setSearchEmail,
    purchaseDate,
    setPurchaseDate,
    filteredUsers,
    handleFilter,
  };
}
