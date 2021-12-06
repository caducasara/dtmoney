import { GlobalStyle } from "./styles/golbal";
import Modal from 'react-modal';
import { useState } from "react";

import { Header } from './components/Header';
import { Dashboard } from "./components/Dashborad";
import { NewTransactionModal } from "./components/NewTransactionModal";
import { TransactionsProvider } from "./hooks/useTransactions";

Modal.setAppElement('#root');

export function App() {

  const [isNewTransactionModalOpen, setIsNewTransactionModalOpen] = useState(false);


  function handleOpenNewTransactionModal(){
    setIsNewTransactionModalOpen(true);
  }

  function handleCloseNewTransactionModal(){
    setIsNewTransactionModalOpen(false);
  }

  return (
    <TransactionsProvider>
      <Header onOpenNewTransactionModal={ handleOpenNewTransactionModal }/>

      <Dashboard />

      <NewTransactionModal
        isOpen={ isNewTransactionModalOpen }
        onRequestClose={ handleCloseNewTransactionModal }
      />

      <GlobalStyle />
    </TransactionsProvider>
  );
}