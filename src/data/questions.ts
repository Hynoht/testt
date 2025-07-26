
const questions = [
  {
    question: 'Quel est le type de votre chaussure ?',
    type: 'option',
    options: ['Baskets', 'Chaussures de sport', 'Bottes', 'Sandales', 'Autre']
  },
  {
    question: 'De quelle marque est votre chaussure ?',
    type: 'option',
    options: ['Nike', 'Adidas', 'Puma', 'Reebok', 'Autre']
  },
  {
    question: 'Quel est votre pointure ?',
    type: 'number',
  },
  {
    question: 'Vos lacets sont-ils défaits ?',
    type: 'choise',
    choises: ['Non', 'Oui']
  },
  {
    question: 'Veuillez nous fournir une preuve visuelle.',
    type: 'file'
  }
];
export default questions;