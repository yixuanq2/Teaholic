import React from 'react';
import Navbar from "./navbar";
import {Button, Card, CardDeck} from "react-bootstrap";
import reactCSS from 'reactcss'
import {slideInRight} from 'react-animations';
import Radium, {StyleRoot} from 'radium';

const popularMilkTea = [
    {
        "name": "BROWN SUGAR MILK TEA",
        "imageUrl": "https://i.pinimg.com/originals/16/bf/1a/16bf1a4d418146fe7ad50f83f99a25a7.jpg",
        "description": "A mixture of three simple ingredients- syrup, milk, and Boba pearls. Yet this Brown Sugar Milk Tea has taken the world by storm! It is so uncomplicated to make and so addicting.",
        "article": "https://www.foxyfolksy.com/brown-sugar-milk-tea/"
    },
    {
        "name": "VANILLA BOBA TEA",
        "imageUrl": "https://www.ohhowcivilized.com/wp-content/uploads/bubble-tea-5.jpg",
        "description": "Vanilla boba tea powder used to make Vanilla bubble tea smoothies and Vanilla boba milk teas. The smell of vanilla is a wake up of a sweet flavorful scent which asks to be tasted, and tasted some more. Besides being popular on its own, it is a welcome addition to other flavors, from berries to chocolate and coffee. We've gone to great lengths to give you a better-tasting and richer vanilla powder for more flavor, and a better, stronger aroma which is true to the vanilla seed. Enjoy drinks with your friends and family any time!",
        "article":"https://www.bobateadirect.com/vanilla-boba-tea-bubble-tea-powder-new-improved.html"
    },
    {
        "name": "boba milk tea",
        "imageUrl": "https://www.theflavorbender.com/wp-content/uploads/2020/06/Bubble-Milk-Tea-7511-780x1169.jpg",
        "description": "Bubble tea is one of my favorite things to sip on during the summer. Originating from Taiwan, bubble tea (波霸奶茶/珍珠奶茶) usually consists of sweetened tea with milk and the characteristic chewy tapioca balls, also known as boba (波霸). Bubble tea comes in many flavors: plain tea flavors such as black or jasmine tea; fruit flavors such as strawberry or honeydew; and even taro, which is a root vegetable commonly used in Asian dishes",
        "article": "https://healthynibblesandbits.com/how-to-make-bubble-tea/"
    },
    {
        "name": "chocolate milk tea",
        "imageUrl": "https://www.foxyfolksy.com/wp-content/uploads/2020/06/brown-sugar-milk-tea.jpg",
        "description": "Invented in the 1980s, the exact story on who invented Bubble Tea is somewhat debated, however, it is believed that Ms. Lin Hsiu Hui of the Chun Shui Tang Tea Shop in Taichung, Taiwan, came up with the drink when she randomly poured fen yuan into her iced tea during a meeting in 1988. ",
        "article":"https://theforkedspoon.com/bubble-tea/"
    },
]

function Home() {

    const styles = reactCSS({
        'default': {
            card: {
                backgroundColor: 'rgba(255, 255, 255, 0.5)',
                width: '15rem',

            },
            slideInRight: {
                animation: 'x 0.8s',
                animationName: Radium.keyframes(slideInRight, 'slideInRight')
            }
        },
    })

    return (
        <div>
            <Navbar name="home"/>
            <div className="container-fluid mt-4">
                <StyleRoot>
                    <div style={styles.slideInRight}>
                        <CardDeck>
                            {popularMilkTea.map((item, _) => {
                                return (
                                    <Card style={styles.card}>
                                        <Card.Img variant="top" src={item.imageUrl}></Card.Img>
                                        <Card.Body>
                                            <Card.Title>{item.name.toUpperCase()}</Card.Title>
                                            <Card.Text>
                                                {item.description}
                                            </Card.Text>
                                            <a href={item.article}>Learn more</a>
                                        </Card.Body>
                                    </Card>
                                )
                            })}
                        </CardDeck></div>
                </StyleRoot>
            </div>
        </div>
    );

}

export default Home;