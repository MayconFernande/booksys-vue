<template>
  <v-container class="py-10" fluid>
    <v-row justify="center" class="mb-8">
      <v-col cols="12" md="10" lg="8">
        <h1 class="text-h3 font-weight-bold text-center mb-6">Política de Privacidade</h1>
        <p class="text-body-1 text-center">
          A presente política de privacidade é válida única e exclusivamente na utilização e no processamento de dados neste website.
          Respeitamos a sua privacidade bem como os seus dados pessoais, tomando todas as medidas necessárias a manter em segurança os mesmos.
        </p>
      </v-col>
    </v-row>

    <!-- Seções como cards -->
    <v-row justify="center" class="mb-6" dense>
      <v-col
        v-for="(section, index) in sections"
        :key="index"
        cols="12"
        md="10"
        lg="8"
        class="mb-4"
      >
        <v-list outlined elevation="2" class="pa-4">
          <v-list-title class="text-h6 font-weight-semibold">
            {{ section.title }}
          </v-list-title>
          <v-list-text class="text-body-1">
            <div v-for="(paragraph, pIndex) in section.paragraphs" :key="pIndex" class="mb-4">
              {{ paragraph }}
            </div>
          </v-list-text>
        </v-list>
      </v-col>
    </v-row>

    <!-- Nota de atualização -->
    <v-row justify="center">
      <v-col cols="12" md="10" lg="8" class="text-center">
        <p class="text-body-2 text--secondary mt-4">
          Última atualização: 24/07/2025.
        </p>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
const sections = [
  {
    title: '1. Entidade responsável pelo tratamento de dados.',
    paragraphs: [
      'A entidade responsável pelo tratamento de dados enviados pelos utilizadores é xxxxxxxxxx xxxxxxxxxx.',
      'Ao entrar neste website são utilizados cookies, ou seja, pequenos ficheiros de texto que são colocados no disco rígido por um servidor de páginas Web, os quais permitem uma melhor experiência de navegação e acesso a outras funcionalidades do website, tudo isto para prestar um serviço de excelência ao utilizador.'
    ]
  },
  {
    title: '2. O que são cookies?',
    paragraphs: [
      'Cookies são pequenos ficheiros que os servidores web gravam no equipamento que acede ao site, conforme as permissões configuradas no navegador (browser) utilizado e retendo apenas informação relacionada com a navegação ou funcionalidades do site, não sendo usada para identificar pessoalmente os utilizadores, não incluindo, como tal, os seus dados pessoais.'
    ]
  },
  {
    title: '3. Para que servem os Cookies?',
    paragraphs: [
      'Os cookies servem para ajudar à navegação no site, para determinar a utilidade, interesse e medição de visitantes, permitindo uma navegação mais rápida e eficiente, eliminando a necessidade de introduzir repetidamente as mesmas informações.'
    ]
  },
  {
    title: '4. Para que fins utilizamos cookies?',
    paragraphs: [
      'Utilizamos apenas cookies estritamente necessários, para personalizar e facilitar ao máximo a navegação, mas também, para a solução de problemas, estatísticas anónimas, garantia de qualidade, e para monitorizar o funcionamento e a segurança do sistema.',
      'Estes cookies estão sempre ativados quando navega no nosso site exceto se desativar os mesmos nas definições do seu browser, caso em que não garantimos o correto funcionamento de todas as áreas do nosso website.',
      'Os cookies podem também ser utilizados para saber que produto um visitante adicionou ao carrinho de compras e para mostrar produtos relevantes para o utilizador consoante a navegação no nosso website.',
      'Estes cookies podem incluir vários dados anónimos, como o endereço IP, o tipo de navegador, o tipo de dispositivo, o sistema operativo, a data/ hora de acesso e o URL referenciador do seu pedido.'
    ]
  },
  {
    title: '5. Recolha de dados pessoais',
    paragraphs: [
      'Os dados pessoais recolhidos neste website têm como finalidade responder a pedidos de contacto, de orçamentos, de informações em geral e para efeitos legais necessários caso venha a celebrar algum contrato ou transação comercial com a nossa empresa e as informações, pessoais ou não, não são transmitidas a terceiros.',
      'Os dados dos utilizadores ficam guardados em servidores Cloud localizados na União Europeia. Estes servidores são protegidos e mantidos de acordo com os mais elevados standards de segurança e respeitando sempre as leis de privacidade aplicáveis.'
    ]
  },
  {
    title: '6. Direitos dos titulares dos dados',
    paragraphs: [
      'O utilizador tem o direito de nos termos da lei, consultar, eliminar ou proceder à retificação dos seus dados pessoais, enviados pelo nosso website. Para este efeito e para reconhecermos a identidade do titular dos dados, os utilizadores devem enviar uma mensagem a partir do seu próprio email dirigida a geral@websystems.pt indicando de forma clara o que pretende relativamente aos seus dados pessoais.'
    ]
  },
  {
    title: '7. Período de tempo durante o qual guardamos os dados',
    paragraphs: [
      'Conservaremos os seus dados pessoais pelo período necessário à prestação dos serviços, respetiva faturação e finalidades referidas.'
    ]
  },
  {
    title: '8. Direito de reclamação',
    paragraphs: [
      'O utilizador tem o direito a apresentar queixa na autoridade de supervisão da proteção de dados (cnpd.pt).'
    ]
  }
]
</script>
