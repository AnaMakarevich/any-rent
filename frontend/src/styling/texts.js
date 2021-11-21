export const useReturnsTemplate = (requiredPostActions, checkedAtReturn, kaution) => `
**Rental Conditions** 

You can read the full rental contract here (link to PDF)

**Before rental:** 

- By sending the "Rent" request you are expressing your interest, but the item is not guaranteed to you. It's up to the provider to decide if he wants to rent to you.
- When you get the confirmation and meet with the provider, you **BOTH** have to confirm the item state by confirming the truthfulness of images in the app. The provider cannot change the image while contract is active, which provider you protection from false claims.
- When the contract is started, the coins are deducted from your account. They are not transferred to the provider until the item is returned.

**During rental:**

- You agree to take care about the rented item and follow standard handling instructions for the item.
- You agree not to expose the rented item to damage
- You agree not to rent out this item to anyone
- You agree that in case of damage you are obliged to pay the provider up to ${kaution}EUR, depending on the damage done.
- You agree that in case the item is not returned on time and the contract is not prolonged, your personal data is shared with the provider, such that they can take measures. In this case your account will be suspended and you will not be able to rent anything.
- In case of disagreement a third-party might be invited

**Before you return the item to the owner:** 

${requiredPostActions}

**On return the provider will check the following:** 

${checkedAtReturn}
`;