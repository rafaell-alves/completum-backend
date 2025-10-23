import SeedCharacter from './SeedCharacter';

(async () => {
  try {
    console.log('Iniciando seed de personagens...');
    const seeder = new SeedCharacter();
    await seeder.seedChampions(); // Usando 'any' como solução rápida
    await seeder.seedItems(); // Usando 'any' como solução rápida

    console.log('Seed concluído com sucesso!');
  } catch (error) {
    console.error('Erro durante a execução do seed:', error);
  } finally {
    process.exit(0);
  }
})();
