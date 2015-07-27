// http://www.programwitherik.com/doing-animations-and-transitions-with-liquid-fire-and-ember/

export default function(){
  this.transition(
    //this.fromRoute('pagecontent'),
    //this.toRoute('pages'),
    this.use('toLeft'),
    this.reverse('toRight')
  );
  this.transition(
    this.fromRoute('pages'),
    this.toRoute('pagecontent'),
    this.use('toDown'),
    this.reverse('toUp')
  );
}
