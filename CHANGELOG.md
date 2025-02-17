# Changelog 📝

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.1.0] - 2022-01-31

| | | | |
| - | - | - | - |
| ![image](https://user-images.githubusercontent.com/5731176/215854212-c04da10b-bc73-4705-af33-ad652ce0e646.png) | ![image](https://user-images.githubusercontent.com/5731176/215854280-ba446d06-07fe-4fcd-8ab6-db3148b2471c.png) | ![image](https://user-images.githubusercontent.com/5731176/215854322-dc032f35-9ea0-4f76-8948-7bebf440799c.png) | ![image](https://user-images.githubusercontent.com/5731176/215854860-50e69246-086d-463e-b532-df2f1ee7f8ae.png) |

### Added

- Adicionado regra no eslint para evitar exportação errado do Styled (Web)
- Adicionado tema do React Navigation
- Adicionado tipo de estilo (dark/light) na status bar
- Adicionado comando no NPM para verificar tipagem do Typescript em todo o projeto (`yarn ts-check`)
- Adicionado controle de features do app via variável de ambiente (`RN_FEATURES_OFF`)
- Adicionado configurações para pipeline de teste via Gitlab
- Adicionado novo utilitário padrão onde pode ser trocado fácil o banco de dados de um app

### Changed

- Atualizado patch do React Native Paper para 4.12.4
- Nova pasta na estrutura `configs` destinado a gerenciar configurações
- Mostrar que campo é obrigatório em input e select com * vermelho (`isShowRequired={true}`)

### Fixed

- Usando cor de fundo da barra de navegação via contexto do tema
- Ao atualizar o valor pelo métodos do `react-hook-form` de um input/select o valor novo é mostrado na tela
- Ocupado o fundo por 100% em todas as telas
- Desativado build de app para Desktop com Android

## [1.0.2] - 2022-09-26

### Added

- Adicionado componente alternativo ao Alert para mostrar erros de forma mais sutil (Snackbar)
- Adicionado retornos original de http status e http response data para erros de request
- Adicionado exemplo de testes usando FireEvent
- Adicionado Mock para RN Reanimated
- Adicionado Mock para RN Safe Area Context

### Changed

- Definindo versão fixa de instalação do React Native Reanimated
- Primeira letra do campo de erro é mostrado com letra maiúscula
- Novo componente de input com suporte melhor a dark mode, eventos de troca de texto e mostrar label personalizada.

### Fixed

- Usando estilo compatível com VSCode Styled
- Alinhando texto de erro no input
- Status 422 agora mostrar o erro processado
- Tirando opacidade da cores em componentes desabilitados
- Adicionado opção para configurar cor do `placeholder`
- Mock de navegação incorporar o tema
- Evitar problemas de sobreposição do teclado no iOS onde há scroll
- Suporte a DarkMode para o Select
- FormData não funcionar no Jest
- Falhas na importação de funções do RN Platform
- Corrigido problema do Safe Area Context não funcionar no Jest

## [1.0.1] - 2022-06-20

### Fixed

- Aplicando cor no fundo que faltava 

## [1.0.0] - 2022-06-13

| | | |
| - | - | - |
![image](https://user-images.githubusercontent.com/5731176/172487765-efc86b04-5244-438d-b441-94bf5d544399.png) | ![image](https://user-images.githubusercontent.com/5731176/172487825-4ac12b38-511c-45d7-b4c4-967620b2ea3e.png) | ![image](https://user-images.githubusercontent.com/5731176/172487790-709491b1-9361-4e96-98be-edb9d3cf86f7.png) |

### Added

- Criado boilerplate
