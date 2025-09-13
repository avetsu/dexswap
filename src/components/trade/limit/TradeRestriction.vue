<template>
  <div class="restricted-box">
    <svg width="24" height="22" viewBox="0 0 24 22" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M23.6455 17.0455L14.8524 1.63146C13.984 0.0900604 11.9214 -0.460441 10.4016 0.420361C9.85884 0.750662 9.42462 1.19106 9.2075 1.63146L0.414465 17.0455C-0.453983 18.5869 0.0887974 20.6788 1.60858 21.5596C2.15136 21.8899 2.69414 22 3.23692 22H20.7144C22.5599 22 23.9711 20.4586 23.9711 18.697C24.0797 18.0364 23.8626 17.4859 23.6455 17.0455ZM12.03 17.596C11.3786 17.596 10.9444 17.1556 10.9444 16.495C10.9444 15.8344 11.3786 15.394 12.03 15.394C12.6813 15.394 13.1155 15.8344 13.1155 16.495C13.1155 17.1556 12.6813 17.596 12.03 17.596ZM13.1155 12.091C13.1155 12.7516 12.6813 13.192 12.03 13.192C11.3786 13.192 10.9444 12.7516 10.9444 12.091V7.68697C10.9444 7.02637 11.3786 6.58597 12.03 6.58597C12.6813 6.58597 13.1155 7.02637 13.1155 7.68697V12.091Z" fill="#F7931A" />
</svg>
    <span class="restricted-text">
      Limits may not execute exactly when tokens reach the specified price. 

      <a href="#">More detailed...</a>
    </span>
  </div>
</template>

<style scoped>
svg {
  flex-shrink: 0;
}
.restricted-box {
  margin-top: 16px;
  border-radius: 10px;
  background: #fff;
  display: flex;
  align-items: center;
  padding: 10px;
  gap: 10px;
  width: 100%;
}

.restricted-text {
  font-family: var(--font-family);
  font-weight: 400;
  font-size: 12px;
  line-height: 1.2;
  color: #22212e;
}

.restricted-text a {
  font-family: var(--font-family);
  font-weight: 300;
  font-size: 12px;
  color: #9ddf1e;
  margin-left: 10px;
}
</style>
