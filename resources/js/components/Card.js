import React from 'react';

const Card = (props) => {

    const card_href = "/get/" + props.card.ObjectID["$oid"];
    const card_name = props.card.first_name + " " + props.card.last_name;

    return(
        <div className="col-3">
            <div className="card">
                <img className="card-img-top" src={props.card.avatar} alt={card_name} />
                    <div className="card-body">
                        <h5 className="card-title">Имя: {card_name}</h5>
                        <a href={card_href} className="btn btn-primary">Открыть карточку</a>
                    </div>
            </div>
        </div>
    )
};

export default Card;
