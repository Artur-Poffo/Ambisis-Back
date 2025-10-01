# Ambisis - Seleção

> 💡 Eu sei que isso pode parecer um grande over-engineering e que não é ideal fazer uma arquitetura tão elaborada em projetos que não têm potencial de escalabilidade. No entanto, como se trata de um processo seletivo, achei interessante apresentar uma solução completa e bem estruturada.

- [x] Companies
  - [x] Create
  - [x] Read -> List all, filter on client-side -> Simpler
  - [x] Update -> Simple Update
  - [x] Delete -> Simple Delete + Cascade delete EnvironmentalLicenses
- [x] EnvironmentalLicense
  - [x] Create -> And attach to Company
  - [x] Read -> List all from Company
  - [x] Update -> Simple Update
  - [x] Delete -> Simple Delete
- [ ] Review entire project
- [ ] Documentation
