# Ambisis - Seleção

💡 Eu sei que isso pode parecer um grande over-engineering e que não é ideal fazer uma arquitetura tão elaborada em projetos que não têm potencial de escalabilidade. No entanto, como se trata de um processo seletivo, achei interessante apresentar uma solução completa e bem estruturada.

- [ ] Companies
  - [x] Create
  - [x] Read -> List all, filter on client-side -> Simpler
  - [x] Update -> Simple Update
  - [ ] Delete -> Simple Delete + Cascade delete EnvironmentalLicenses
- [ ] EnvironmentalLicense
  - [ ] Create -> And attach to Company
  - [ ] Read -> List all from Company
  - [ ] Update -> Simple Update
  - [ ] Delete -> Simple Delete
- [ ] Documentation
