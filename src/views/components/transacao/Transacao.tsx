import { Component } from "react";
import { DataTransacao } from "../../../interfaces";
import LocalStorage from "../../helpers/LocalStorage";
import Home from "../../home/Home";

import "./transacao.scss";

interface Props extends DataTransacao {
    idTransacao: number,
    storage: LocalStorage<DataTransacao[]>,
    updateTotais: Function
}

class Transacao extends Component<Props> {

    constructor(props: Props) {
        super(props);
    }

    render = () => {

        const { valor, descricao, data } = this.props;

        return (
            <tr className="transacao">
                <td>{descricao}</td>
                <td style={{ color: valor < 0 ? "#e83f5b" : "#02500f" }}>{Home.currencyFormater.format(valor)}</td>
                <td>{data}</td>
                <td>
                    <button onClick={this.btnRemoveTransacao}>
                        <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M14 2C7.37258 2 2 7.37258 2 14C2 20.6274 7.37258 26 14 26C20.6274 26 26 20.6274 26 14C26 7.37258 20.6274 2 14 2Z" stroke="#E83F5B" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M7.57143 15.0713C6.97969 15.0713 6.5 14.5916 6.5 13.9999V13.9999C6.5 13.4082 6.97969 12.9285 7.57143 12.9285L20.4286 12.9285C21.0203 12.9285 21.5 13.4082 21.5 13.9999V13.9999C21.5 14.5916 21.0203 15.0713 20.4286 15.0713L7.57143 15.0713Z" fill="#E83F5B" />
                        </svg>
                    </button>
                </td>
            </tr>
        );
    }

    private btnRemoveTransacao = () => {
        const { storage, updateTotais, idTransacao } = this.props;

        const transacoes = storage.get();

        if (!transacoes)
            return;

        transacoes.splice(idTransacao, 1);

        storage.set(transacoes);

        updateTotais();
    }
}

export default Transacao;