import { Component } from "react";
import Transacao from "../components/transacao/Transacao";
import Modal from "../components/modal/Modal";
import Valor from "../components/valor/Valor";

import "./home.scss";
import LocalStorage from "../helpers/LocalStorage";
import { DataTransacao } from "../../interfaces";

interface State {
    totalEntrada: number,
    totalSaida: number,
    showModalTransacao: boolean
}

class Home extends Component<any, State>{

    public static currencyFormater = new Intl.NumberFormat("pt-BR", { currency: "BRL", style: "currency", maximumFractionDigits: 2 });
    protected storage: LocalStorage<DataTransacao[]>;

    constructor(props: any) {
        super(props);

        this.storage = new LocalStorage<DataTransacao[]>("Transações");
        const [totalEntrada, totalSaida] = this.updateTotais();

        this.state = {
            totalEntrada,
            totalSaida,
            showModalTransacao: false,
        }
    }

    render = () => {

        const { totalEntrada, totalSaida, showModalTransacao } = this.state;

        return (
            <>
                <nav>
                    <svg width="172" height="24" viewBox="0 0 172 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0 13.6625C0 12.1321 0.304832 10.777 0.914497 9.59693C1.54209 8.4169 2.38486 7.50423 3.44281 6.8589C4.51869 6.19513 5.71112 5.86325 7.02011 5.86325C7.9884 5.86325 8.93876 6.08451 9.87118 6.52702C10.8215 6.95109 11.5747 7.52266 12.1305 8.24174V0.885019H15.2237V21.3511H12.1305V19.0556C11.6285 19.7931 10.9291 20.4015 10.0326 20.8809C9.15393 21.3603 8.14081 21.6 6.99321 21.6C5.70216 21.6 4.51869 21.2681 3.44281 20.6044C2.38486 19.9222 1.54209 18.9818 0.914497 17.7834C0.304832 16.5665 0 15.1928 0 13.6625ZM12.1305 13.7178C12.1305 12.6668 11.9154 11.7542 11.485 10.9798C11.0726 10.2054 10.5257 9.61537 9.84429 9.20973C9.1629 8.8041 8.42771 8.60128 7.63874 8.60128C6.84976 8.60128 6.11458 8.8041 5.43319 9.20973C4.7518 9.59693 4.19593 10.1777 3.76557 10.9521C3.35315 11.7081 3.14694 12.6115 3.14694 13.6625C3.14694 14.7134 3.35315 15.6353 3.76557 16.4282C4.19593 17.221 4.7518 17.8294 5.43319 18.2535C6.13251 18.6592 6.86769 18.862 7.63874 18.862C8.42771 18.862 9.1629 18.6592 9.84429 18.2535C10.5257 17.8479 11.0726 17.2579 11.485 16.4835C11.9154 15.6907 12.1305 14.7688 12.1305 13.7178Z" fill="white" />
                        <path d="M32.834 13.3583C32.834 13.9298 32.7982 14.4461 32.7265 14.907H21.4028C21.4925 16.1239 21.9318 17.1012 22.7208 17.8387C23.5098 18.5762 24.4781 18.9449 25.6257 18.9449C27.2753 18.9449 28.4409 18.2351 29.1223 16.8154H32.4306C31.9823 18.2166 31.1664 19.369 29.983 20.2725C28.8174 21.1575 27.365 21.6 25.6257 21.6C24.2091 21.6 22.936 21.2773 21.8063 20.632C20.6945 19.9682 19.8159 19.0464 19.1704 17.8663C18.5428 16.6679 18.229 15.285 18.229 13.7178C18.229 12.1506 18.5338 10.777 19.1435 9.59693C19.7711 8.39846 20.6408 7.47657 21.7525 6.83124C22.8822 6.18592 24.1732 5.86325 25.6257 5.86325C27.0243 5.86325 28.2705 6.1767 29.3643 6.80358C30.4581 7.43047 31.3099 8.31549 31.9195 9.45864C32.5292 10.5834 32.834 11.8832 32.834 13.3583ZM29.6333 12.3626C29.6154 11.201 29.2119 10.2699 28.4229 9.56927C27.634 8.86863 26.6567 8.51831 25.4912 8.51831C24.4332 8.51831 23.5277 8.86863 22.7746 9.56927C22.0215 10.2515 21.5732 11.1826 21.4297 12.3626H29.6333Z" fill="white" />
                        <path d="M41.5806 18.5301L45.7765 6.11216H49.031L43.3827 21.3511H39.7247L34.1032 6.11216H37.3847L41.5806 18.5301Z" fill="white" />
                        <path d="M52.5861 21.5447C52.0302 21.5447 51.564 21.3511 51.1874 20.9639C50.8109 20.5767 50.6226 20.0973 50.6226 19.5257C50.6226 18.9542 50.8109 18.4748 51.1874 18.0876C51.564 17.7004 52.0302 17.5068 52.5861 17.5068C53.124 17.5068 53.5813 17.7004 53.9578 18.0876C54.3344 18.4748 54.5226 18.9542 54.5226 19.5257C54.5226 20.0973 54.3344 20.5767 53.9578 20.9639C53.5813 21.3511 53.124 21.5447 52.5861 21.5447Z" fill="white" />
                        <path d="M64.0498 8.68425H61.3064V21.3511H58.2132V8.68425H56.4649V6.11216H58.2132V5.03355C58.2132 3.28194 58.6615 2.00973 59.5581 1.2169C60.4726 0.405633 61.8981 0 63.8347 0V2.6274C62.9022 2.6274 62.2478 2.81178 61.8712 3.18054C61.4946 3.53086 61.3064 4.14853 61.3064 5.03355V6.11216H64.0498V8.68425Z" fill="white" />
                        <path d="M68.3273 4.09321C67.7714 4.09321 67.3052 3.89962 66.9287 3.51242C66.5521 3.12522 66.3638 2.64584 66.3638 2.07426C66.3638 1.50269 66.5521 1.0233 66.9287 0.636108C67.3052 0.248911 67.7714 0.055313 68.3273 0.055313C68.8652 0.055313 69.3225 0.248911 69.6991 0.636108C70.0756 1.0233 70.2639 1.50269 70.2639 2.07426C70.2639 2.64584 70.0756 3.12522 69.6991 3.51242C69.3225 3.89962 68.8652 4.09321 68.3273 4.09321ZM69.8335 6.11216V21.3511H66.7673V6.11216H69.8335Z" fill="white" />
                        <path d="M81.3366 5.86325C82.5021 5.86325 83.5422 6.11216 84.4566 6.60999C85.3891 7.10781 86.1153 7.84533 86.6353 8.82254C87.1553 9.79974 87.4153 10.9798 87.4153 12.3626V21.3511H84.376V12.8328C84.376 11.4684 84.0442 10.4266 83.3808 9.70755C82.7173 8.97004 81.8118 8.60128 80.6642 8.60128C79.5166 8.60128 78.6021 8.97004 77.9207 9.70755C77.2572 10.4266 76.9255 11.4684 76.9255 12.8328V21.3511H73.8593V6.11216H76.9255V7.85455C77.4276 7.22766 78.0641 6.73905 78.8352 6.38873C79.6242 6.03841 80.458 5.86325 81.3366 5.86325Z" fill="white" />
                        <path d="M90.3044 13.6625C90.3044 12.1321 90.6093 10.777 91.2189 9.59693C91.8465 8.4169 92.6893 7.50423 93.7472 6.8589C94.8231 6.19513 96.0066 5.86325 97.2976 5.86325C98.4632 5.86325 99.4763 6.10295 100.337 6.58233C101.216 7.04328 101.915 7.62407 102.435 8.32471V6.11216H105.528V21.3511H102.435V19.0832C101.915 19.8023 101.207 20.4015 100.31 20.8809C99.4135 21.3603 98.3914 21.6 97.2438 21.6C95.9707 21.6 94.8052 21.2681 93.7472 20.6044C92.6893 19.9222 91.8465 18.9818 91.2189 17.7834C90.6093 16.5665 90.3044 15.1928 90.3044 13.6625ZM102.435 13.7178C102.435 12.6668 102.22 11.7542 101.789 10.9798C101.377 10.2054 100.83 9.61537 100.149 9.20973C99.4673 8.8041 98.7321 8.60128 97.9432 8.60128C97.1542 8.60128 96.419 8.8041 95.7376 9.20973C95.0562 9.59693 94.5004 10.1777 94.07 10.9521C93.6576 11.7081 93.4514 12.6115 93.4514 13.6625C93.4514 14.7134 93.6576 15.6353 94.07 16.4282C94.5004 17.221 95.0562 17.8294 95.7376 18.2535C96.4369 18.6592 97.1721 18.862 97.9432 18.862C98.7321 18.862 99.4673 18.6592 100.149 18.2535C100.83 17.8479 101.377 17.2579 101.789 16.4835C102.22 15.6907 102.435 14.7688 102.435 13.7178Z" fill="white" />
                        <path d="M117.033 5.86325C118.198 5.86325 119.238 6.11216 120.153 6.60999C121.085 7.10781 121.812 7.84533 122.332 8.82254C122.852 9.79974 123.112 10.9798 123.112 12.3626V21.3511H120.072V12.8328C120.072 11.4684 119.74 10.4266 119.077 9.70755C118.414 8.97004 117.508 8.60128 116.36 8.60128C115.213 8.60128 114.298 8.97004 113.617 9.70755C112.953 10.4266 112.622 11.4684 112.622 12.8328V21.3511H109.556V6.11216H112.622V7.85455C113.124 7.22766 113.76 6.73905 114.531 6.38873C115.32 6.03841 116.154 5.86325 117.033 5.86325Z" fill="white" />
                        <path d="M126.001 13.7178C126.001 12.1506 126.306 10.777 126.915 9.59693C127.543 8.39846 128.403 7.47657 129.497 6.83124C130.591 6.18592 131.846 5.86325 133.263 5.86325C135.056 5.86325 136.535 6.30576 137.701 7.19078C138.884 8.05736 139.682 9.30192 140.095 10.9245H136.786C136.517 10.1685 136.087 9.57849 135.495 9.15442C134.904 8.73035 134.159 8.51831 133.263 8.51831C132.008 8.51831 131.004 8.97926 130.25 9.90115C129.515 10.8046 129.148 12.0768 129.148 13.7178C129.148 15.3588 129.515 16.6402 130.25 17.5621C131.004 18.484 132.008 18.9449 133.263 18.9449C135.038 18.9449 136.213 18.1429 136.786 16.5388H140.095C139.664 18.0876 138.857 19.3229 137.674 20.2448C136.49 21.1483 135.02 21.6 133.263 21.6C131.846 21.6 130.591 21.2773 129.497 20.632C128.403 19.9682 127.543 19.0464 126.915 17.8663C126.306 16.6679 126.001 15.285 126.001 13.7178Z" fill="white" />
                        <path d="M156.733 13.3583C156.733 13.9298 156.698 14.4461 156.626 14.907H145.302C145.392 16.1239 145.831 17.1012 146.62 17.8387C147.409 18.5762 148.377 18.9449 149.525 18.9449C151.175 18.9449 152.34 18.2351 153.022 16.8154H156.33C155.882 18.2166 155.066 19.369 153.882 20.2725C152.717 21.1575 151.264 21.6 149.525 21.6C148.108 21.6 146.835 21.2773 145.706 20.632C144.594 19.9682 143.715 19.0464 143.07 17.8663C142.442 16.6679 142.128 15.285 142.128 13.7178C142.128 12.1506 142.433 10.777 143.043 9.59693C143.67 8.39846 144.54 7.47657 145.652 6.83124C146.782 6.18592 148.073 5.86325 149.525 5.86325C150.924 5.86325 152.17 6.1767 153.264 6.80358C154.358 7.43047 155.209 8.31549 155.819 9.45864C156.429 10.5834 156.733 11.8832 156.733 13.3583ZM153.533 12.3626C153.515 11.201 153.111 10.2699 152.322 9.56927C151.533 8.86863 150.556 8.51831 149.391 8.51831C148.333 8.51831 147.427 8.86863 146.674 9.56927C145.921 10.2515 145.473 11.1826 145.329 12.3626H153.533Z" fill="white" />
                        <path d="M52.5865 21.5447C52.0307 21.5447 51.5644 21.3511 51.1879 20.9639C50.8113 20.5767 50.623 20.0974 50.623 19.5258C50.623 18.9542 50.8113 18.4748 51.1879 18.0876C51.5644 17.7004 52.0307 17.5068 52.5865 17.5068C53.1245 17.5068 53.5817 17.7004 53.9583 18.0876C54.3348 18.4748 54.5231 18.9542 54.5231 19.5258C54.5231 20.0974 54.3348 20.5767 53.9583 20.9639C53.5817 21.3511 53.1245 21.5447 52.5865 21.5447Z" fill="#49AA26" />
                        <path d="M171.999 17.325C171.999 18.1057 171.773 18.8396 171.321 19.5266C170.886 20.2136 170.235 20.7914 169.366 21.2598C168.515 21.7282 167.502 22.0093 166.326 22.103V24.0001H164.561V22.103C162.86 21.9624 161.485 21.5018 160.435 20.7211C159.385 19.9404 158.86 18.9099 158.86 17.6295H162.172C162.227 18.2384 162.453 18.7459 162.851 19.1519C163.249 19.5422 163.819 19.7921 164.561 19.9014V14.7487C163.349 14.4832 162.362 14.2178 161.602 13.9523C160.842 13.6713 160.191 13.2341 159.648 12.6407C159.123 12.0474 158.86 11.2355 158.86 10.2049C158.86 8.90894 159.385 7.83936 160.435 6.99619C161.485 6.13741 162.86 5.63776 164.561 5.49723V3.6001H166.326V5.49723C167.918 5.62214 169.194 6.05934 170.153 6.80882C171.131 7.54269 171.683 8.55762 171.809 9.8536H168.497C168.443 9.36956 168.226 8.94017 167.846 8.56543C167.466 8.17507 166.959 7.90963 166.326 7.7691V12.8281C167.538 13.0779 168.524 13.3434 169.285 13.6244C170.045 13.8899 170.687 14.3193 171.212 14.9126C171.737 15.4903 171.999 16.2945 171.999 17.325ZM162.009 10.0644C162.009 10.7046 162.227 11.2042 162.661 11.5634C163.113 11.9225 163.747 12.2113 164.561 12.4299V7.69883C163.783 7.77691 163.159 8.01893 162.688 8.4249C162.236 8.83087 162.009 9.37737 162.009 10.0644ZM166.326 19.9014C167.122 19.7921 167.746 19.5188 168.199 19.0816C168.651 18.6288 168.877 18.0901 168.877 17.4655C168.877 16.841 168.651 16.3569 168.199 16.0134C167.764 15.6543 167.14 15.3654 166.326 15.1468V19.9014Z" fill="#49AA26" />
                    </svg>
                </nav>

                <main id="home">

                    <section className="valores">
                        <Valor tipo="Entradas" valor={totalEntrada} />
                        <Valor tipo="Saídas" valor={totalSaida} />
                        <Valor tipo="Total" valor={totalEntrada - totalSaida} />
                    </section>

                    <section className="transacoes">
                        <button onClick={() => this.btnNovaTransacao()}>+ Nova Transação</button>

                        <table>
                            <thead>
                                <tr>
                                    <th>Descrição</th>
                                    <th>Valor</th>
                                    <th>Data</th>
                                </tr>
                            </thead>

                            <tbody>
                                {
                                    this.storage.get()?.map((dataTransacao, index) =>
                                        <Transacao
                                            idTransacao={index}
                                            descricao={dataTransacao.descricao}
                                            valor={dataTransacao.valor}
                                            data={dataTransacao.data}
                                            storage={this.storage}
                                            updateTotais={this.updateTotais}
                                        />)
                                }
                            </tbody>
                        </table>
                    </section>

                    {showModalTransacao ? <Modal fecharModal={this.fecharModal} updateTotais={this.updateTotais} storage={this.storage} /> : <></>}
                </main>

                <footer>
                    {new Date().getUTCFullYear()} - devFinance$
                </footer>
            </>
        );
    }

    private btnNovaTransacao = () => this.setState({ showModalTransacao: true });
    protected fecharModal = () => this.setState({ showModalTransacao: false });

    protected updateTotais = (): number[] => {
        const transacoes = this.storage.get();
        let totalEntrada = 0, totalSaida = 0;

        if (!transacoes)
            return [totalEntrada, totalSaida];

        transacoes.forEach((transacao) => {
            if (transacao.valor < 0)
                totalSaida += transacao.valor * -1;
            else
                totalEntrada += transacao.valor;
        });

        this.setState({ totalEntrada, totalSaida });

        return [totalEntrada, totalSaida];
    }
}

export default Home;