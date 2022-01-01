import { Component } from "react";
import { DataTransacao } from "../../../interfaces";
import LocalStorage from "../../helpers/LocalStorage";

import "./modal.scss";

interface Props {
    fecharModal: Function,
    updateTotais: Function,
    storage: LocalStorage<DataTransacao[]>
}

interface State extends DataTransacao { }

class Modal extends Component<Props, State> {

    constructor(props: Props) {
        super(props);

        this.state = {
            descricao: "",
            data: "",
            valor: 0,
        }
    }

    render = () => {
        return (
            <div className="modal-transacao">
                <form onSubmit={this.formSubmit}>
                    <h3>Nova Transação</h3>

                    <input type="text" onInput={this.setDescricao} name="descricao" placeholder="Descrição" required />
                    <input type="text" onInput={this.setValor} name="valor" placeholder="0,00" required />
                    <input type="date" onInput={this.setData} name="data" required />

                    <div className="form-buttons">
                        <button type="submit" className="salvar">Salvar</button>
                        <button type="button" className="cancelar" onClick={() => this.props.fecharModal()}>Cancelar</button>
                    </div>
                </form>
            </div>
        );
    }

    private formSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
        evt.preventDefault();

        const { storage, fecharModal, updateTotais } = this.props;
        const { data, descricao, valor } = this.state;

        let transacoes = storage.get();

        if (!transacoes)
            storage.set([{ data, descricao, valor }]);
        else {
            transacoes.push({ data, descricao, valor });
            storage.set(transacoes);
        }

        this.setState({ data: "", descricao: "", valor: 0 });

        fecharModal();
        updateTotais();
    }

    private setDescricao = (evt: React.FormEvent<HTMLInputElement>) => this.setState({ descricao: evt.currentTarget.value });
    private setValor = (evt: React.FormEvent<HTMLInputElement>) => {
        let value = evt.currentTarget.value;

        value = value.replace(/[^\d-,]/, "");
        evt.currentTarget.value = value

        this.setState({ valor: parseFloat(value.replace(",", ".")) });
    }
    private setData = (evt: React.FormEvent<HTMLInputElement>) => this.setState({ data: evt.currentTarget.value.split("-").reverse().join("/") });
}

export default Modal;