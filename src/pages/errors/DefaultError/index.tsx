import React, { PropsWithChildren } from "react";
import BackButton from '../../../components/backbutton/BackButton';
import { useHistory } from 'react-router-dom';
import "./styles.scss";

interface Props extends PropsWithChildren<any> {
  title: string;
  children: React.ReactNode | React.FunctionComponent;
}

const defaultProps: Props = {
  children: <p>Falha ao usar componente</p>,
  title: "Erro"
}

const DefaultError: React.FC<Props> = ({title, children}) => {
  const history = useHistory();
  return <>
  	<BackButton onClick={() => history.push('/home')} />
    {/* TODO fix align */}
    <h2>{ title }</h2><br/>
    { children }
  </>
}

DefaultError.defaultProps = defaultProps;


export default DefaultError;
