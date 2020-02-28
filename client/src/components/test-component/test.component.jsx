import React from "react";
import axios from "axios";
import { connect } from "react-redux";
import { ReactComponent as NextBtn } from "../../assets/icons/caret-right-solid.svg";
import { ReactComponent as BackBtn } from "../../assets/icons/caret-left-solid.svg";

import "./test.styles.scss";

class Test extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      uid: this.props.currentUser.uid,
      properties: []
    };
  }

  componentDidMount() {
    axios
      // .get("http://localhost:5000/api/home/users-rooms?uid=" + this.state.uid)
      .get(
        "http://broadkatsme.herokuapp.com/api/home/users-rooms?uid=" +
          this.state.uid
      )
      .then(rooms => {
        const properties = rooms.data;
        this.setState({ properties: rooms.data });
        // this.setState({property: JSON.stringify(rooms.data)});
        console.log(JSON.stringify(rooms.data));
      })
      .catch(error => {
        console.error(error);
        console.log("oof");
      });
  }
  render() {
    return (
      <div className="test-container">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. In, fugiat?
        Quam esse molestias at accusamus eveniet aperiam, expedita repellendus
        tempore nam dolorum suscipit! Temporibus pariatur itaque iure eos
        blanditiis asperiores vitae praesentium animi reprehenderit fugit sint,
        obcaecati ducimus corporis inventore debitis consectetur tempore culpa,
        molestiae quisquam. Fugit eligendi ratione non possimus aliquam error in
        sit reiciendis tempora corrupti nobis debitis sapiente, ducimus
        obcaecati nihil placeat atque dolorem? Labore officia reiciendis, illo
        aut repellat beatae. Optio quibusdam rem laboriosam repellendus aperiam
        nostrum odio animi recusandae rerum, repudiandae, ullam totam quam.
        Voluptatum nisi fugiat provident, pariatur consectetur, distinctio quod
        magni error soluta facilis rem non nobis iure quo doloribus blanditiis
        itaque. Sapiente facere alias natus. Nulla corporis in asperiores
        repudiandae, molestiae cum exercitationem veritatis culpa quos
        perspiciatis officia delectus rerum id dolorum recusandae fuga neque
        impedit aut tenetur iure enim odit nisi perferendis reiciendis! Sed,
        rerum inventore officia voluptate officiis incidunt cumque similique non
        excepturi sit veniam impedit aut? Debitis, velit quaerat consequuntur
        placeat ipsa dolore eligendi tempora voluptatum distinctio a ipsam
        doloribus excepturi laboriosam recusandae, reprehenderit fugit,
        aspernatur odio quas rem commodi. Amet laboriosam commodi suscipit
        distinctio inventore ut sequi, ad pariatur enim deserunt fuga error
        dignissimos, voluptatibus, recusandae labore autem perspiciatis quis
        aperiam. Praesentium quasi commodi nemo maxime numquam, est iste
        delectus repellat perspiciatis, veniam, unde excepturi hic omnis sit
        quis? Odit dicta esse eaque, eos beatae accusamus facilis porro
        inventore quas ut fuga quae commodi ad velit assumenda officiis nobis
        voluptates animi nesciunt? Quae vitae fugiat officia sunt. Accusantium,
        assumenda! Sint, velit commodi. Quam alias sapiente repellendus rem iste
        itaque dolor quidem beatae blanditiis labore? Aut, pariatur sint nisi
        numquam porro, nobis recusandae nihil dolore modi rem consequatur,
        veniam nam molestiae quod odio magni voluptas! Cupiditate nostrum error
        commodi nam nihil soluta eligendi beatae at ex officiis corrupti debitis
        consequatur, numquam ducimus minima. Quasi harum dicta magni, sed
        commodi dolore. Atque veritatis dolores ex maxime. Odit fugiat sequi
        soluta ex harum quae iure omnis in adipisci iusto, pariatur et.
        Repudiandae nostrum aliquam explicabo necessitatibus excepturi
        perspiciatis facilis, numquam minima quasi fugiat maxime dolorem eveniet
        rerum voluptatum non optio est veritatis ducimus dolorum! Consectetur
        eligendi praesentium inventore tenetur minus veritatis esse. Omnis ad
        veritatis qui neque velit earum provident commodi odit! Neque
        perspiciatis impedit, rem beatae maxime eveniet sequi quisquam ab minus
        quis dolor officiis nostrum aperiam modi assumenda enim quas voluptatem
        quos! Cum quibusdam nam facere, sit deserunt quo dolore magnam suscipit,
        explicabo placeat necessitatibus illo architecto corporis aut tempora
        laborum fugit recusandae praesentium vitae. Accusantium fuga dicta
        sapiente voluptas doloremque dolor quia voluptatibus odit quasi autem
        cupiditate nam tenetur magni voluptatem perspiciatis numquam, qui
        dolorem molestias iste ullam laudantium quidem quod? Temporibus
        excepturi, enim dolorem fugit blanditiis provident illum, numquam
        nostrum quam, expedita quis natus porro suscipit cupiditate cumque
        dolore iusto accusamus veritatis tenetur maiores voluptate? Totam quidem
        alias id maxime iste cupiditate fugiat unde minus facilis adipisci,
        quaerat ullam non sunt tenetur recusandae natus saepe modi eos. Nemo non
        necessitatibus magnam voluptatibus quibusdam, explicabo neque, tempora
        ipsum quis a voluptas earum nesciunt error doloremque vel esse ut et,
        sapiente est quo. Ratione dolores repellat, voluptas dolorem, eum hic
        vero ab esse perspiciatis aperiam iste explicabo temporibus, atque
        laudantium earum tempore dolorum! Maxime ipsum odio delectus deleniti
        illum ex quia iure, quod hic iusto, atque eveniet totam voluptas odit
        deserunt facere dolore nihil officia omnis tempora! Excepturi
        repellendus voluptatem nihil assumenda. Rerum amet dolorum aliquid nobis
        omnis accusantium! Molestiae, ipsa eaque. Dolorum ducimus sint quis
        delectus molestiae dolorem, modi fugiat nisi earum mollitia aliquam
        exercitationem officiis voluptatem praesentium iure pariatur provident
        sunt doloribus ut, quae dolores ad unde! Magnam suscipit commodi
        incidunt, quidem perferendis veniam non veritatis aliquam minima quam et
        voluptatem, voluptatum voluptates laboriosam odio impedit dolorem.
        Tempora repellat provident perferendis quae. Commodi, fugiat officiis.
        Sunt officia unde laboriosam quas esse culpa inventore quisquam, eius
        quasi exercitationem dolor laudantium minus? Temporibus pariatur dolor,
        optio quibusdam iusto quia laborum vero nulla quod obcaecati provident
        tempora, deleniti rerum quae ut porro cum natus incidunt culpa,
        laboriosam consequatur! Est dignissimos fugit reprehenderit minus
        recusandae placeat, at quaerat quod cumque voluptatum quia aperiam
        consequatur praesentium beatae cum reiciendis? Porro ex sequi at
        explicabo dolor voluptatum. Sunt ex voluptate hic explicabo nostrum,
        maiores laboriosam. Repellendus dolores quibusdam ex impedit quaerat
        facere aperiam voluptas itaque amet iusto. Optio fugit iure reiciendis
        ut hic libero eveniet blanditiis totam quisquam maxime id alias facilis
        praesentium, aperiam provident, voluptas repellendus voluptatem
        doloribus cupiditate. Non, fugit. Consectetur ipsa odit aliquid numquam,
        impedit inventore, excepturi quas cum adipisci iure quisquam nihil
        asperiores cupiditate eaque eius sit magnam aperiam est quod expedita
        ipsam soluta. Facilis harum dignissimos optio earum, enim assumenda
        dolores ducimus quaerat, nostrum neque consequuntur a hic corporis
        labore modi quia inventore. Illo expedita exercitationem velit
        distinctio alias explicabo aperiam vitae corrupti, accusamus eos aliquid
        et soluta fugiat reiciendis sequi quasi magni odit quae repellendus
        dolores eaque voluptatem? Aut necessitatibus unde esse architecto
        deleniti. Sapiente nisi fuga corrupti iste libero dicta sit cumque nam
        amet repellat at accusamus, ipsa vero aperiam eos corporis non? Amet
        consequatur ducimus maxime placeat, quaerat voluptates ex magnam
        recusandae eos rerum deleniti similique ullam fuga suscipit. Dicta,
        magni iste! Beatae ut ducimus nemo amet sunt eaque ad sint soluta
        debitis laborum a unde dolores quos consectetur facilis totam temporibus
        repellendus, repudiandae molestiae ab quas harum. Id quidem, ea aliquid
        nihil veritatis ipsa error mollitia, facilis rem repudiandae omnis
        deleniti eos vitae quos iure praesentium quasi velit, ipsum ipsam. Vitae
        repellendus tempora molestias sequi. Vitae perspiciatis doloribus quo
        ipsam alias fuga similique iure animi ullam aliquid, quaerat aperiam.
        Libero adipisci dolor omnis esse at dicta impedit commodi iste repellat
        magnam! Cumque quasi consequatur et, quo ea quibusdam possimus eligendi
        facilis voluptas ex laudantium libero odio, non, commodi expedita sequi
        labore est vitae animi? Modi quasi, minima quod ad rerum placeat quae
        esse cumque soluta. Vel quod, iste cum aspernatur accusantium non labore
        vitae praesentium accusamus quas assumenda. Vitae in odit rem pariatur
        numquam quibusdam alias perspiciatis architecto, sapiente perferendis
        beatae molestiae reprehenderit ratione.
      </div>
    );
  }
}

const mapStateToProps = state => ({
  currentUser: state.user.currentUser
});

export default connect(mapStateToProps)(Test);
