package betterHitboxes;

import javax.swing.*;
import java.awt.*;

public class Main {
	
	public static Coord mouse = new Coord();
	
	public static void getMouseCoords(JFrame frame) {
		mouse.x = MouseInfo.getPointerInfo().getLocation().getX();
		mouse.y = MouseInfo.getPointerInfo().getLocation().getY();
		mouse.x -= frame.getLocation().x;
		mouse.y -= frame.getLocation().y+29;
	}
	
	public static JPanel background = new JPanel();
	
	public static void drawFrame(JFrame frame, Color color) {
		background.setBackground(color);
		background.setBounds(100, 100, 200, 200);
	}
	
	public static boolean generateTestEquation(Coord mousePos, int x, int y, int x2, int y2) {
		if(x2-x!=0) { 
			if(mousePos.y>=((y2-y)/(x2-x))*mousePos.x + (y-((y2-y)/(x2-x))*mousePos.x)) {
				return true;
			}
		} else {
			if(mousePos.x>=x) {
				return true;
			}
		}
		return false;
	}
	
	public static void update(JFrame frame) throws InterruptedException {
		getMouseCoords(frame);
		
		if(generateTestEquation(mouse, 100, 100, 100, 300)&&generateTestEquation(mouse, 100, 100, 300, 100)&&generateTestEquation(mouse, 300, 100, 300, 300)==false&&generateTestEquation(mouse, 100, 300, 300, 300)==false) {
			drawFrame(frame, Color.orange);
		} else {
			drawFrame(frame, Color.red);
		}
		
		Thread.sleep(50);
		update(frame);
	}
	
	public static void main(String[] args) throws InterruptedException {
		
		JFrame mainFrame = new JFrame("Better Hitboxes");
		mainFrame.setVisible(true);
		mainFrame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
		mainFrame.setSize(800, 450);
		mainFrame.add(background);
		
		update(mainFrame);
		
	}

}
