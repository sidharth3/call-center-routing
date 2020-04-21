package seleniumTesting;

import java.awt.Toolkit;
import java.awt.datatransfer.Clipboard;
import java.awt.datatransfer.DataFlavor;
import java.awt.datatransfer.Transferable;
import java.io.FileWriter;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.List;

import org.openqa.selenium.By;
import org.openqa.selenium.Keys;
import org.openqa.selenium.StaleElementReferenceException;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;

public class TestXSSAttack1_3 {
	
//	static String [] listOfStr = new String [] {};
	static ArrayList<String> scripts = new ArrayList<String>();

	public static void main(String[] args) throws InterruptedException, IOException {
		getScript();
//		runScripts();
		printScripts();
		
	}
	private static void printScripts() {
		for(int i = 0; i<scripts.size();i++) {
			System.out.println(scripts.get(i));
		}
	}
		
	
	public static void runScripts() throws InterruptedException{
		System.setProperty("webdriver.chrome.driver","C:\\Users\\akmal\\Downloads\\chromedriver_win32\\chromedriver.exe"); //change path
		//
		WebDriver driver = new ChromeDriver();
	
		driver.get("http://localhost:3000/");
		
	
		WebElement chatButton = driver.findElement(By.id("support_image"));
		chatButton.click();
		Thread.sleep(3000);
		
		WebElement yesButton = driver.findElement(By.className("botui-actions-buttons-button"));
		yesButton.click();
		
		Thread.sleep(3000);

		List<WebElement> allClassSameType = driver.findElements(By.className("botui-actions-buttons-button"));

		
		allClassSameType.get(2).click(); //0 1 2 depending on uPhone uPad or General


		
		System.out.println("successfully connected");

		
		Thread.sleep(15000); //loading textBox takes 12 seconds
		WebElement textBox = driver.findElement(By.className("botui-actions-text-input"));
		
		Thread.sleep(3000);
		
		boolean staleElementLoaded = true;
		
		for(int i = 0; i<scripts.size();i++) {
			try {
				Thread.sleep(1000);
				textBox.sendKeys(scripts.get(i));
				textBox.sendKeys(Keys.ENTER);
				textBox = driver.findElement(By.className("botui-actions-text-input"));
				
			} catch (StaleElementReferenceException e){
				staleElementLoaded = true;
			}
			
		}
	}

	private static void getScript() throws InterruptedException {
		
		System.setProperty("webdriver.chrome.driver",
				"C:\\Users\\akmal\\Downloads\\chromedriver_win32\\chromedriver.exe"); // change path
		//
		WebDriver driver = new ChromeDriver();

		driver.get("https://portswigger.net/web-security/cross-site-scripting/cheat-sheet");

		List<WebElement> copyToClipboardButtons = driver.findElements(By.className("xss-cheat-sheet-button--copy"));

		Thread.sleep(3000);
		for(int i=0;i<copyToClipboardButtons.size();i++) {
			copyToClipboardButtons.get(i).click();
			scripts.add(getClipboardContents());
		}

	}

	public static String getClipboardContents() {
		String result = "";
		Clipboard clipboard = Toolkit.getDefaultToolkit().getSystemClipboard();
		// odd: the Object param of getContents is not currently used
		Transferable contents = clipboard.getContents(null);
		boolean hasTransferableText = (contents != null) && contents.isDataFlavorSupported(DataFlavor.stringFlavor);
		if (hasTransferableText) {
			try {
				result = (String) contents.getTransferData(DataFlavor.stringFlavor);
			} catch (Exception ex) {
				System.out.println(ex);
				ex.printStackTrace();
			}
		}
		return result;
	}

}
