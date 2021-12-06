import Modal from 'react-modal';
import { FormEvent, useState } from 'react';


import IncomeImg from '../../assets/income.svg';
import OutcomeImg from '../../assets/outcome.svg';
import CloseImg from '../../assets/close.svg';

import { Container, TransactionTypeContainer, RadioBox } from './styles';
import { useTransactions } from '../../hooks/useTransactions';

interface NewTransactionModalPorps {
    isOpen: boolean;
    onRequestClose: () => void;
}


export function NewTransactionModal({ isOpen, onRequestClose }: NewTransactionModalPorps){

    const { createNewTransaction } = useTransactions();

    const [title,setTitle] = useState('');
    const [amount, setAmount] = useState(0);
    const [category,setCategory] = useState('');
    const [type, setType] = useState('');

    async function handleCreateNewTransaction(event: FormEvent) {
        event.preventDefault();

        await createNewTransaction({
            title,
            amount,
            category,
            type
        });

        setTitle('');
        setAmount(0);
        setCategory('');
        setType('');

        onRequestClose();
    }


    return (
        <Modal
            isOpen= { isOpen } 
            onRequestClose={ onRequestClose }
            overlayClassName="react-modal-overlay" 
            className="react-modal-content"
        >
            <button onClick={ onRequestClose }  className="react-modal-close">
                <img src={CloseImg} alt="Fechar"/>
            </button>
            <Container onSubmit={ handleCreateNewTransaction }>
                <h2>Cadastrar nova transação</h2>
                <input type="text" placeholder="Titulo" value={ title } onChange={ event => setTitle(event.target.value) }/>
                <input type="number" placeholder="Valor" value={ amount } onChange={ event => setAmount(Number(event.target.value)) }/>
                <TransactionTypeContainer>
                    <RadioBox 
                        type="button"
                        onClick= { () => { setType('deposit'); } }
                        isActive= {type === 'deposit'}
                        activeColor="green"
                    >
                        <img src={ IncomeImg } alt="Entrada" />
                        <span>Entrada</span>
                    </RadioBox>
                    <RadioBox 
                        type="button"
                        onClick= { () => { setType('withdraw'); } }
                        isActive= {type === 'withdraw'}
                        activeColor="red"
                    >
                        <img src={ OutcomeImg } alt="Saída" />
                        <span>Saída</span>
                    </RadioBox>
                </TransactionTypeContainer>
                <input type="text" placeholder="Cartegoria" value={ category } onChange={ event => setCategory(event.target.value) }/>
                <button type="submit">Cadastrar</button>
            </Container>
        </Modal>
    );
}