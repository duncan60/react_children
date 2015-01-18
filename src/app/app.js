/** @jsx React.DOM */

'use strict';

var React  = require('react'),
    cwp    = require('react/lib/cloneWithProps');

var ChildrenA = React.createClass({
    render : function(){
        return  (
            <a className='btn btn-danger' onClick={this.props.onHandler}>
                {this.props.txt}
            </a>
        )
    }
});

var ChildrenB = React.createClass({
    render: function(){
        return(
            <a className='btn btn-primary' onClick={this.props.onHandler}>
                {this.props.children}
            </a>
       )
     }
});

var ChildrenC = React.createClass({
     _onClickHandler:function(){
       console.log('ChildrenC click handler');
     },
     render: function(){
       return(
         <a className='btn btn-success' onClick={this._onClickHandler}>
          ChildrenC Text
         </a>
       )
     }
});

var Parent = React.createClass({
    getInitialState: function(){
        return{
          txt : 'From Parent Text'
        };
    },
    componentWillMount: function(){
        console.log(this.props.value);
        this.props.rootFu();
    },
    _parentHandler: function(){
       console.log('parent click handler');
        this.setState({
          txt : 'Change From Parent Text'
        });
    },
    render: function(){
        var chlidrenA = cwp(this.props.children[0], {
            onHandler : this._parentHandler,
            txt       : this.state.txt
        });
        return(
            <div>
                {chlidrenA}
                {this.props.children[1]}
                {this.props.childrenC()}
            </div>
        );
    }
});



var Root = React.createClass({
    getDefaultProps: function() {
        return {
            value  : 'default value',
            rootFu : function() {
                console.log('Root function ')
            }
        };
    },
    getInitialState: function(){
        return{
            txt : 'From Root Text'
        };
    },
    _rootHandler: function(){
        console.log('root click handler');
        this.setState({
            txt : 'Change From Root Text'
        });
    },
    render: function(){
        return(
          <Parent {...this.props} childrenC={ChildrenC}>
            <ChildrenA />
            <ChildrenB  onHandler={this._rootHandler}>
               {this.state.txt}
            </ChildrenB>
          </Parent>
        );
    }  
});

React.render(<Root />, document.getElementById('app'));
