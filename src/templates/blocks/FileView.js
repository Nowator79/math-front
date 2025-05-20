import { Component } from 'react';
import "./FileView.css";
import { ReactComponent as FileSvg } from './../../images/file.svg';


export default class FileView extends Component{
	render(){
		if(this.props.file){
			return (
				<a className='file-view' href={this.props.file}>
					<FileSvg />
				</a>
			)
		}
	}
}